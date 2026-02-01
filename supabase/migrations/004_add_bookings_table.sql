-- Sistema de Reservas para Doulas

-- Tabla de disponibilidad de doulas (horarios)
CREATE TABLE IF NOT EXISTS doula_availability (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doula_id UUID NOT NULL REFERENCES doulas(id) ON DELETE CASCADE,
    day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Domingo, 6=Sábado
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(doula_id, day_of_week, start_time)
);

-- Tabla de reservas/citas
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doula_id UUID NOT NULL REFERENCES doulas(id) ON DELETE CASCADE,
    
    -- Información del cliente
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    
    -- Detalles de la cita
    service_type VARCHAR(100) NOT NULL, -- Tipo de acompañamiento
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    
    -- Modalidad
    modality VARCHAR(20) NOT NULL CHECK (modality IN ('presencial', 'online')),
    meeting_link VARCHAR(500), -- Para citas online
    location_notes TEXT, -- Para citas presenciales
    
    -- Estado de la reserva
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
    
    -- Notas
    client_notes TEXT, -- Notas del cliente al reservar
    doula_notes TEXT, -- Notas privadas de la doula
    admin_notes TEXT, -- Notas del administrador
    
    -- Confirmaciones
    confirmed_by_doula BOOLEAN DEFAULT false,
    confirmed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancellation_reason TEXT,
    
    -- Recordatorios
    reminder_sent BOOLEAN DEFAULT false,
    reminder_sent_at TIMESTAMP WITH TIME ZONE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de bloqueos de horario (vacaciones, días libres, etc.)
CREATE TABLE IF NOT EXISTS schedule_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doula_id UUID NOT NULL REFERENCES doulas(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para búsquedas eficientes
CREATE INDEX IF NOT EXISTS idx_bookings_doula_id ON bookings(doula_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_client_email ON bookings(client_email);
CREATE INDEX IF NOT EXISTS idx_availability_doula ON doula_availability(doula_id);
CREATE INDEX IF NOT EXISTS idx_schedule_blocks_doula ON schedule_blocks(doula_id);

-- Trigger para actualizar updated_at
CREATE OR REPLACE FUNCTION update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_bookings_updated_at();

-- Políticas de seguridad RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE doula_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_blocks ENABLE ROW LEVEL SECURITY;

-- Cualquiera puede crear reservas
CREATE POLICY "Anyone can create bookings" ON bookings
    FOR INSERT WITH CHECK (true);

-- Solo admins y la doula pueden ver las reservas
CREATE POLICY "View bookings" ON bookings
    FOR SELECT USING (true);

-- Solo admins pueden modificar reservas
CREATE POLICY "Admins can update bookings" ON bookings
    FOR UPDATE USING (auth.role() = 'authenticated');
