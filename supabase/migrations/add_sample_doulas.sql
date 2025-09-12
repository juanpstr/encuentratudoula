-- Insert sample doula data
INSERT INTO doulas (
  name,
  email,
  phone,
  bio,
  specialties,
  languages,
  experience_years,
  certifications,
  location_address,
  location_city,
  location_country,
  hourly_rate,
  currency,
  is_active
) VALUES 
(
  'María González',
  'maria@example.com',
  '+1-555-0101',
  'Experienced doula specializing in natural birth and postpartum care. Passionate about supporting families during this transformative time.',
  ARRAY['Natural Birth', 'Postpartum Care', 'Breastfeeding Support'],
  ARRAY['Spanish', 'English'],
  8,
  ARRAY['DONA Certified', 'Lamaze Certified'],
  '123 Main Street',
  'Miami',
  'United States',
  75.00,
  'USD',
  true
),
(
  'Sarah Johnson',
  'sarah@example.com',
  '+1-555-0102',
  'Certified birth doula with a focus on empowering women through education and emotional support.',
  ARRAY['Birth Support', 'Childbirth Education', 'VBAC Support'],
  ARRAY['English'],
  5,
  ARRAY['CAPPA Certified', 'Spinning Babies Certified'],
  '456 Oak Avenue',
  'Austin',
  'United States',
  80.00,
  'USD',
  true
),
(
  'Ana Rodríguez',
  'ana@example.com',
  '+1-555-0103',
  'Bilingual doula offering comprehensive prenatal, birth, and postpartum support to Latino families.',
  ARRAY['Prenatal Support', 'Birth Support', 'Postpartum Care', 'Cultural Support'],
  ARRAY['Spanish', 'English'],
  12,
  ARRAY['DONA Certified', 'Postpartum Corrective Exercise Specialist'],
  '789 Pine Street',
  'Los Angeles',
  'United States',
  90.00,
  'USD',
  true
);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON doulas TO anon;
GRANT ALL PRIVILEGES ON doulas TO authenticated;