BEGIN;

INSERT INTO farmhouses (address, description, realtorId, price, rooms, bathrooms, sizeSQFT)
VALUES
    ('436278 Farmville, Philadelphia, PA 29018', 'nim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos', 3, 300000, 5, 3, 1500),
    ('4526 Hatsboil, Haverford, PA 22219', ' sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam e', 3, 500000, 3, 3, 2200),
    ('2600 Loildale, Harrisburg, PA 28188', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit', 3, 750000, 4, 2, 2500),
    ('3400 Qator, Voncent, PA 382892', 'vident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum solut', 3, 450000, 4, 3, 2000);

COMMIT;