-- Crear tabla de reviews/testimonios
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doula_id UUID NOT NULL REFERENCES doulas(id) ON DELETE CASCADE,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255),
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    service_type VARCHAR(100), -- Tipo de acompañamiento recibido
    is_approved BOOLEAN DEFAULT false, -- La doula debe aprobar el testimonio
    is_public BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_reviews_doula_id ON reviews(doula_id);
CREATE INDEX IF NOT EXISTS idx_reviews_is_approved ON reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_reviews_updated_at
    BEFORE UPDATE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_reviews_updated_at();

-- Trigger para actualizar el contador y rating de la doula cuando se aprueba una reseña
CREATE OR REPLACE FUNCTION update_doula_rating()
RETURNS TRIGGER AS $$
BEGIN
    -- Actualizar el rating promedio y contador de reseñas de la doula
    UPDATE doulas 
    SET 
        rating = COALESCE((
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM reviews 
            WHERE doula_id = COALESCE(NEW.doula_id, OLD.doula_id) 
            AND is_approved = true
        ), 4.5),
        reviews_count = (
            SELECT COUNT(*) 
            FROM reviews 
            WHERE doula_id = COALESCE(NEW.doula_id, OLD.doula_id) 
            AND is_approved = true
        ),
        updated_at = NOW()
    WHERE id = COALESCE(NEW.doula_id, OLD.doula_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_doula_rating
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_doula_rating();

-- Políticas de seguridad RLS
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Política para permitir a cualquiera crear reseñas (formulario público)
CREATE POLICY "Anyone can create reviews" ON reviews
    FOR INSERT
    WITH CHECK (true);

-- Política para que solo se vean las reseñas aprobadas públicamente
CREATE POLICY "Public can view approved reviews" ON reviews
    FOR SELECT
    USING (is_approved = true AND is_public = true);

-- Política para que los admins vean todas las reseñas
CREATE POLICY "Admins can view all reviews" ON reviews
    FOR ALL
    USING (auth.role() = 'authenticated');
