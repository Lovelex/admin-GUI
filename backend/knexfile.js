// Update with your config settings.

module.exports = {
    client: 'postgresql',
    connection: {
      database: 'inicio',
      user:     'postgres',
      password: '012060'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
