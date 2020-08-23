BEGIN;

INSERT INTO realtors (full_name, user_name, password, email, number, description)
VALUES 
    ('Jordan Lopez', 'jordanlopez992', 'test1', 'jlopez@gmail.com', 267, 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.'),
    ('Joshua Beber', 'jBibby', 'test2', 'jbeber@gmail.com', 234, 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur'),
    ('Luis Aponte', 'lAponte23', 'test3', 'laponte@gmail.com', 324, 'Et harum quidem rerum facilis est et expedita distinctio.'),
    ('Abby Colon', 'NYCBaby', 'test4', 'acolon@gmail.com', 787, 'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat'),
    ('Nina Figeroa', 'NThatJawn', 'test5', 'nfigeroa@gmail.com', 972, 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'),
    ('Tina Brown', 'TGetTruth', 'test6', 'tbrown@gmail.com', 909, 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?');

COMMIT;