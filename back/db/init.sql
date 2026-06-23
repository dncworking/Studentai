CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE, 
    credits INTEGER NOT NULL        
);

CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    course INTEGER NOT NULL,          
    subject_id INTEGER NOT NULL,    
    CONSTRAINT fk_subject FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

INSERT INTO subjects (name, credits) VALUES 
('Objektinis programavimas', 6),
('Duomenų bazės', 6),
('Tinklo technologijos', 3)
ON CONFLICT (name) DO NOTHING;

INSERT INTO students (first_name, last_name, course, subject_id) VALUES 
('Jonas', 'Jonaitis', 2, 1),
('Petras', 'Petraitis', 1, 2),
('Antanas', 'Antanaitis', 3, 1),
('Marija', 'Marijaitė', 2, 3);