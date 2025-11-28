-- Create projects table in Supabase
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  github TEXT NOT NULL,
  liveDemo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data (your existing projects)
INSERT INTO projects (title, description, image, technologies, github, liveDemo) VALUES
(
  'Recipe Recommender',
  'A smart meal planning tool that helps users discover recipes based on available ingredients and dietary preferences.',
  './recipe-app.png',
  ARRAY['React.js', 'Tailwind CSS', 'Gemini API'],
  'https://github.com/dev-ayomide/Recipe-Recommender.git',
  'https://recipe-recommender-ai.vercel.app/'
),
(
  'Chart Capstone Limited Website',
  'A modern corporate website built for Chart Capstone Limited, a company specializing in Oil & Gas, Agriculture, and Solid Minerals.',
  './cci-app.png',
  ARRAY['React', 'Tailwind CSS'],
  'https://github.com/dev-ayomide/chart-and-capstone-integrated-limited.git',
  'https://chartandcapstone.com/'
),
(
  'Event Ticketing Generator',
  'A conference ticketing system that allows users to register, validate details, and generate tickets with avatars.',
  './event-app.png',
  ARRAY['React', 'Tailwind CSS', 'Cloudinary API'],
  'https://github.com/dev-ayomide/conference-ticket-generator.git',
  'https://conference-ticket-generator-drab.vercel.app/'
),
(
  'Arbitrum Token App',
  'Token Management Hub is a web3 application built on Arbitrum Sepolia testnet that provides seamless token interactions for blockchain developers',
  './token-app.png',
  ARRAY['React', 'Tailwind CSS', 'Cloudinary API'],
  'https://github.com/dev-ayomide/arbitrum-token-app',
  'https://arbitrum-token-app.vercel.app/'
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read projects
CREATE POLICY "Allow public read access" ON projects
  FOR SELECT USING (true);

-- Create a policy that allows authenticated users to insert projects
CREATE POLICY "Allow authenticated insert" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to update projects
CREATE POLICY "Allow authenticated update" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a policy that allows authenticated users to delete projects
CREATE POLICY "Allow authenticated delete" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');
