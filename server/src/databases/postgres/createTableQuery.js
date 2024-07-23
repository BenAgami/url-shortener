const tableQuery = `CREATE TABLE IF NOT EXISTS shorter_urls (
    id SERIAL PRIMARY KEY,
    original_url varchar(255) UNIQUE,
    shorter_url varchar(255) UNIQUE
)`;

module.exports = { tableQuery };
