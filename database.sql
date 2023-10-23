-- Create the 'user' table
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  username VARCHAR(80) UNIQUE NOT NULL,
  password VARCHAR(1000),
  admin BOOLEAN DEFAULT false
);


-- Create the 'status' table
CREATE TABLE status (
  id SERIAL PRIMARY KEY,
  status_name VARCHAR (50)
);

-- Create the 'client' table
CREATE TABLE client (
  id SERIAL PRIMARY KEY,
  business_name VARCHAR(100),
  address_street VARCHAR(100),
  address_city VARCHAR(100),
  address_state VARCHAR(20),
  address_zip VARCHAR(10),
  website VARCHAR(255),
  manager_id INTEGER REFERENCES "user"(id),
  phone VARCHAR(20),
  hours_of_operation VARCHAR(200),
  micromarket_location VARCHAR(255),
  neighborhood_info VARCHAR(300),
  demographics VARCHAR(300),
  number_of_people VARCHAR(40),
  target_age_group VARCHAR(200),
  industry VARCHAR(255),
  pictures VARCHAR(200)[],
  contract VARCHAR(200)[],
  dimensions VARCHAR(100),
  wugs_visit BOOLEAN default false,
  admin_notes VARCHAR(500),
  status_id INTEGER REFERENCES status(id) default 1,
  last_active TIMESTAMPTZ default NOW ()
);

-- Create the 'service' table
CREATE TABLE service (
  id SERIAL PRIMARY KEY,
  service_name VARCHAR (20)
);

-- Create the 'product' table
CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50),
  url VARCHAR(255)
);

-- Create a separate table for service and product relationships
-- junction table for client's services
CREATE TABLE client_service (
  client_id INTEGER REFERENCES client(id),
  service_id INTEGER REFERENCES service(id),
  PRIMARY KEY (client_id, service_id)
);

-- junction table for client's products
CREATE TABLE client_product (
  client_id INTEGER REFERENCES client(id),
  product_id INTEGER REFERENCES product(id),
  PRIMARY KEY (client_id, product_id)
);

-- Create the 'interested' table
CREATE TABLE interested (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(50),
  phone_number VARCHAR(20),
  industry VARCHAR(100),
  about_you VARCHAR(300),
  why_wugs VARCHAR(300)
);

INSERT INTO "user" (first_name, last_name, username, password, admin)
VALUES
('John', 'Doe', 'john.doe@email.com', 'hashed_password_here', false),
('Jane', 'Smith', 'jane.smith@email.com', 'hashed_password_here', false),
('Bob', 'Johnson', 'bob.johnson@email.com', 'hashed_password_here', false),
('Sarah', 'Brown', 'sarah.brown@email.com', 'hashed_password_here', false),
('David', 'Wilson', 'david.wilson@email.com', 'hashed_password_here', false),
('Laura', 'Miller', 'laura.miller@email.com', 'hashed_password_here', false),
('Michael', 'Jones', 'michael.jones@email.com', 'hashed_password_here', false),
('Emma', 'Davis', 'emma.davis@email.com', 'hashed_password_here', false),
('James', 'Clark', 'james.clark@email.com', 'hashed_password_here', false),
('Olivia', 'White', 'olivia.white@email.com', 'hashed_password_here', false),
('William', 'Martinez', 'william.martinez@email.com', 'hashed_password_here', false),
('Sophia', 'Lopez', 'sophia.lopez@email.com', 'hashed_password_here', false),
('Benjamin', 'Garcia', 'benjamin.garcia@email.com', 'hashed_password_here', false),
('Emily', 'Lee', 'emily.lee@email.com', 'hashed_password_here', false),
('Daniel', 'Perez', 'daniel.perez@email.com', 'hashed_password_here', false),
('Ava', 'Wright', 'ava.wright@email.com', 'hashed_password_here', false);

INSERT INTO service (service_name) 
VALUES 
('Micro Markets'), ('Smart Coolers'), ('Snack Boxes');

INSERT INTO status (status_name) 
VALUES
  ('Onboarding Incomplete'),
  ('Pending Wugs Approval'),
  ('Render In Progress'),
  ('Contract Sent Awaiting Completion'),
  ('Pending Contract Approval'),
  ('Account Active'),
  ('Account Inactive');
  
INSERT INTO product (type, url) 
VALUES
('African', 'https://erafricanonlinestore.com/cdn/shop/articles/African_snacks.jpg?v=1624804433'),
('Asian', 'https://healthynibblesandbits.com/wp-content/uploads/2018/09/Pocky.jpg'),
('Gluten Free', 'https://media.theeverymom.com/wp-content/uploads/2021/07/13164901/gluten-free-snacks-the-everymom-f-h.png'),
('Mexican', 'https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/lwjmyeif/020d87a3-b703-4c0a-ae9c-d9d4139684ed.JPG'),
('Frozen', 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/R62Z6RGZI4I6XDEHVVXSPEMMPA.jpg'),
('Kosher', 'https://bunnyjamesboxes.com/cdn/shop/products/bunny-james-boxes-snack-boxes-premium-kosher-box-20-count-41311457902898_480x480.jpg?v=1681750682'),
('Halal', 'https://offloadmedia.feverup.com/secretldn.com/wp-content/uploads/2022/04/25142606/shutterstock_563091901-2.jpg'),
('Dairy Free', 'https://jessicasglutenfreekitchen.com/wp-content/uploads/2019/04/IMG_4748.jpeg'),
('Vegan', 'https://www.shopmyexchange.com/products/images/xlarge/1698365_0000.jpg'),
('Sweets', 'https://www.nampakincs.com/wp-content/uploads/2019/07/candy.jpeg'),
('Quick Meals', 'https://insiderguides.com.au/wp-content/uploads/2020/05/SG_002_01_X1_0014-1024x576.jpg'),
('Microwavable', 'https://www.readyseteat.com/sites/g/files/qyyrlu501/files/uploadedImages/img_10013_07668.jpg');


INSERT INTO client (
  business_name,
  address_street,
  address_city,
  address_state,
  address_zip,
  website,
  manager_id,
  phone,
  hours_of_operation,
  micromarket_location,
  neighborhood_info,
  demographics,
  number_of_people,
  target_age_group,
  industry,
  pictures,
  dimensions,
  wugs_visit,
  contract,
  admin_notes,
  status_id,
  last_active
) VALUES
('Johnson & Sons Hardware', '123 Main Street', 'Minneapolis', 'MN', '55401', 'www.jshardware.com', 1, '555-123-4567', 'Mon-Sat: 8 AM - 6 PM', 'Store Front', 'Nearby residential area', 'Mixed demographics', '26-100', 'Adults and DIY Enthusiasts', 'Retail', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '12 ft x 4 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The staff loves to try candy from all over the world.', 3, '2023-09-25 10:15:00'),
('Green Valley Medical Clinic', '456 Oak Lane', 'Rochester', 'MN', '55901', 'www.gvmedicalclinic.com', 2, '555-987-6543', 'Mon-Fri: 9 AM - 5 PM', 'Waiting Area', 'Nearby pharmacy and park', 'Patients of all ages', '100+', 'All Ages', 'Healthcare', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '48 inches by 36 inches', false, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The clinic staff mentioned interest in expanding the micro-market offering to include healthier snack options.', 4, '2023-09-26 15:45:00'),
('Riverfront Cafe', '789 River Road', 'Winona', 'MN', '55987', 'www.riverfrontcafe.com', 3, '555-567-8901', 'Mon-Sun: 7 AM - 9 PM', 'Cafeteria', 'Scenic riverfront location', 'Local residents and tourists', '26-100', 'Adults and Families', 'Food & Beverage', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '8 ft x 6 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The cafe owner mentioned potential interest in adding a cooler to offer fresh beverages.', 5, '2023-09-30 12:30:00'),
('Smith & Co. Law Firm', '123 Legal Street', 'Minneapolis', 'MN', '55402', 'www.smithcolaw.com', 4, '555-234-5678', 'Mon-Fri: 9 AM - 6 PM', 'Law Office Lobby', 'Downtown legal district', 'Legal professionals and clients', '10-25', 'Adults', 'Legal Services', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '6 ft x 5 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The law firm manager expressed interest in adding an additional cooler to provide more beverage options for clients and staff. Some colleagues also inquired about the products.', 3, '2023-10-03 14:20:00'),
('Sunshine Daycare Center', '456 Elm Avenue', 'St. Paul', 'MN', '55101', 'www.sunshinedaycare.com', 5, '555-345-6789', 'Mon-Fri: 7 AM - 6 PM', 'Childrens Play Area', 'Residential neighborhood', 'Toddlers and preschoolers', '26-100', 'Children (0-5 years)', 'Childcare', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '12 ft x 8 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The daycare center director mentioned that some parents have shown interest in the micro-market products for their homes. They are also open to exploring more options.', 6, '2023-10-06 16:10:00'),
('Golden Pet Shop', '789 Pet Street', 'Eagan', 'MN', '55120', 'www.goldenpetshop.com', 6, '555-456-7890', 'Mon-Sun: 9 AM - 7 PM', 'Pet Store Entrance', 'Pet-friendly neighborhood', 'Pet owners and enthusiasts', '26-100', 'All Ages', 'Pet Services', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '10 ft x 4 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The pet shop owner mentioned that some customers have asked for a wider variety of pet treats and snacks in the micro-market.', 4, '2023-10-09 10:40:00'),
('Cozy Bookstore', '123 Book Lane', 'Stillwater', 'MN', '55082', 'www.cozybookstore.com', 7, '555-567-8901', 'Mon-Sat: 10 AM - 7 PM', 'Bookstore Aisle', 'Downtown bookstore district', 'Book lovers and readers', '10-25', 'Adults and Book Enthusiasts', 'Retail', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '15 ft x 5 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The bookstore owner is considering expanding the micro-market section to offer more convenience items for shoppers.', 1, '2023-10-13 11:55:00'),
('TechHub Co-working Space', '456 Tech Street', 'Madison', 'WI', '53701', 'www.techhubcoworking.com', 8, '555-678-9012', 'Mon-Fri: 8 AM - 8 PM', 'Co-working Area', 'Tech and startup hub', 'Entrepreneurs and tech professionals', '26-100', 'Adults (18-45)', 'Business Services', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '20 ft x 8 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The co-working space manager expressed interest in exploring additional coolers for a broader beverage selection.', 2, '2023-09-28 17:30:00'),
('Healthy Bites Cafe', '789 Health Road', 'La Crosse', 'WI', '54601', 'www.healthybitescafe.com', 9, '555-789-0123', 'Mon-Sat: 8 AM - 5 PM', 'Cafeteria', 'Nearby fitness center', 'Health-conscious diners', '10-25', 'Adults and Health Enthusiasts', 'Food & Beverage', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '12 ft x 6 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The cafe owner mentioned that some customers are interested in additional healthy snacks and is considering a cooler for fresh drinks.', 3, '2023-09-27 09:25:00'),
('Bright Start Preschool', '123 Sunshine Avenue', 'Sioux Falls', 'SD', '57101', 'www.brightstartpreschool.com', 10, '555-890-1234', 'Mon-Fri: 7 AM - 4 PM', 'Classroom Area', 'Residential neighborhood', 'Preschool students and parents', '26-100', 'Children (3-5 years)', 'Childcare', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '10 ft x 4 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The preschool director mentioned interest in expanding the micro-market offerings with more child-friendly snacks.', 4, '2023-10-02 13:45:00'),
('The Greenery Garden Center', '456 Garden Path', 'Minnetonka', 'MN', '55305', 'www.thegreenery.com', 11, '555-901-2345', 'Mon-Sun: 9 AM - 6 PM', 'Garden Store Entrance', 'Green-thumbed community', 'Gardeners and plant enthusiasts', '26-100', 'All Ages', 'Garden & Plant Services', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '12 ft x 5 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The garden center owner expressed interest in having additional options in the micro-market, particularly items related to gardening and outdoor activities.', 4, '2023-09-25 12:05:00'),
('Starlight Cinema', '123 Movie Lane', 'Duluth', 'MN', '55802', 'www.starlightcinema.com', 12, '555-345-6789', 'Mon-Sun: 5 PM - 11 PM', 'Cinema Lobby', 'Entertainment district', 'Moviegoers of all ages', '100+', 'All Ages', 'Entertainment', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '10 ft x 8 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The cinema manager is open to expanding the micro-market to include more movie snacks.', 6, '2023-09-25 18:55:00'),
('The Vintage Boutique', '456 Vintage Street', 'Minneapolis', 'MN', '55403', 'www.vintageboutique.com', 13, '555-567-8901', 'Mon-Sat: 10 AM - 6 PM', 'Boutique Entrance', 'Fashionable shopping district', 'Fashion enthusiasts and collectors', '10-25', 'Adults', 'Retail', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '8 ft x 4 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The boutique owner mentioned that some customers have inquired about expanding the micro-market to include fashion-related items like accessories and clothing care products.', 1, '2023-10-11 10:25:00'),
('The Coffee House', '789 Java Avenue', 'Rochester', 'MN', '55902', 'www.thecoffeehouse.com', 14, '555-678-9012', 'Mon-Sun: 6 AM - 8 PM', 'Coffee Shop Area', 'Coffee lovers paradise', 'Coffee enthusiasts and students', '10-25', 'Young Adults', 'Food & Beverage', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '12 ft x 6 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The coffee shop owner is interested in exploring the addition of more gourmet coffee options and coffee-related accessories in the micro-market.', 6, '2023-10-05 14:45:00'),
('ABC Tech Solutions', '123 Tech Avenue', 'Minneapolis', 'MN', '55404', 'www.abctechsolutions.com', 15, '555-234-5678', 'Mon-Fri: 9 AM - 6 PM', 'Tech Office Lobby', 'Tech innovation hub', 'Tech professionals and startups', '100+', 'Adults (18-45)', 'Business Services', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '15 ft x 5 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The tech office manager expressed interest in adding more tech-related products and accessories to the micro-market offerings.', 1, '2023-09-29 11:35:00'),
('Maplewood Apartments', '123 Apartment Lane', 'Minneapolis', 'MN', '55405', 'www.maplewoodapts.com', 16, '555-345-6789', 'N/A', 'Apartment Lobby', 'Residential neighborhood', 'Families and professionals', 'Less than 10', 'All Ages', 'Real Estate', ARRAY['https://upload.wikimedia.org/wikipedia/commons/9/9d/MicroMarket.jpg', 'https://www.myrefreshmentsplus.com/wp-content/uploads/2018/03/slide3-1.jpg'], '4 ft x 3 ft', true, ARRAY['https://images.template.net/wp-content/uploads/2015/12/29130035/Sample-Contract-Agreement-Template-PDF.jpeg'], 'The apartment manager mentioned that residents have shown interest in having more convenience items available in the micro-market.', 6, '2023-09-25 09:15:00');

INSERT INTO interested (name, email, phone_number, industry, about_you, why_wugs) VALUES
    ('John Doe', 'john.doe@example.com', '555-555-5555', 'Technology', 'We are a tech startup focused on AI and machine learning.', 'We would like a vending machine to provide convenient snacks and beverages for our employees.'),
    ('Jane Smith', 'jane.smith@example.com', '555-555-5555', 'Healthcare', 'We operate a healthcare clinic specializing in pediatrics.', 'Having a market on-site would be a great convenience for our patients and staff.'),
    ('Michael Johnson', 'michael.johnson@example.com', '555-555-5555', 'Education', 'We are a university library serving students and faculty.', 'A vending machine with study snacks and supplies would be valuable for our users.'),
    ('Sarah Williams', 'sarah.williams@example.com', '555-555-5555', 'Finance', 'We are a financial services firm providing investment advice.', 'Offering snacks and beverages to our clients during meetings would enhance their experience.'),
    ('David Lee', 'david.lee@example.com', '555-555-5555', 'Hospitality', 'We manage a hotel with a restaurant and conference facilities.', 'A vending machine would complement our dining options and cater to late-night cravings for guests.'),
    ('Karen Brown', 'karen.brown@example.com', '555-555-5555', 'Manufacturing', 'We run a manufacturing plant for automotive components.', 'Our employees work long hours, and a vending machine would provide quick access to refreshments.'),
    ('Lisa Taylor', 'lisa.taylor@example.com', '555-555-5555', 'Retail', 'We own a retail store selling electronics and gadgets.', 'Offering snacks and drinks while customers browse our products would boost sales and customer satisfaction.');
    
-- Dummy data for junction tables
INSERT INTO client_service (client_id, service_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(3, 3);

INSERT INTO client_product (client_id, product_id)
VALUES
(1, 1),
(1, 3),
(2, 2),
(3, 1),
(3, 4);