CREATE TABLE realtors (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    number INTEGER NOT NULL,
    password TEXT NOT NULL,
    description TEXT NOT NULL
);