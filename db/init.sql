-- Database initialization script for production
-- This will run when the PostgreSQL container starts for the first time

-- Create database if it doesn't exist (though docker-compose handles this)
-- The database is created via POSTGRES_DB environment variable

-- You can add any additional initialization here
-- For example, creating indexes, views, or initial data

-- Example: Create an index for better performance
-- CREATE INDEX IF NOT EXISTS idx_mock_interview_created_by ON mock_interview(created_by);
-- CREATE INDEX IF NOT EXISTS idx_user_answer_mock_id ON user_answer(mock_id);

-- Log that initialization is complete
DO $$
BEGIN
    RAISE NOTICE 'Database initialization completed successfully';
END
$$;
