import { Pool, QueryResult } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'my_games',
  password: '12345',
  port: 5432, // Default port
});

type QueryFunction = (text: string, params: any[]) => Promise<QueryResult<any>>;

const query: QueryFunction = (text, params) => pool.query(text, params);

export default { query };
