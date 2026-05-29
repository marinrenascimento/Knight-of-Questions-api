import { runMigrations } from './runMigrations.js';
import { runSeeders } from './runSeeders.js';

export async function bootstrapDb() {
  await runMigrations();
  // Removido sequelize.sync({ alter: true }) para favorecer o uso exclusivo de migrations
  await runSeeders();
}
