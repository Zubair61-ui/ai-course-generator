/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./configs/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:npg_Yl5AQK0LqnUE@ep-odd-bread-a1nl3i1q-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    }
  };