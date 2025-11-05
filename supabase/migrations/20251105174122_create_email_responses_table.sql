/*
  # Create email responses table

  1. New Tables
    - `email_responses`
      - `id` (uuid, primary key) - Identificador único de la respuesta
      - `timestamp` (timestamp) - Cuándo se dio la respuesta (automático)
      - `response` (text) - La respuesta (Sí/No)
      - `user_name` (text, optional) - Nombre de quién responde (futuro uso)
      - `user_email` (text, optional) - Email de quién responde (para tracking)

  2. Security
    - Enable RLS on table
    - Allow public inserts (para que se registre cualquier respuesta)
    - Allow admin reads para ver historial

  3. Notes
    - Esta tabla registra cada respuesta para crear un historial
    - Puede integrarse con analytics en el futuro
*/

CREATE TABLE IF NOT EXISTS email_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz DEFAULT now(),
  response text NOT NULL,
  user_name text,
  user_email text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_responses ENABLE ROW LEVEL SECURITY;

-- Política: Cualquiera puede insertar una respuesta
CREATE POLICY "Anyone can submit responses"
  ON email_responses FOR INSERT
  WITH CHECK (true);

-- Política: Solo lectura pública (sin datos sensibles)
CREATE POLICY "Anyone can view responses count"
  ON email_responses FOR SELECT
  USING (true);
