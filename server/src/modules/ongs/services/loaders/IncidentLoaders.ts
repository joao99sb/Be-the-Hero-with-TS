import { getRepository } from 'typeorm';
import Incidents from '../../../incidents/entities/Incident';

async function batchIncidents(ongId: string): Promise<Incidents[]> {
  return await getRepository(Incidents).find({
    where: {
      ongId: ongId,
    },
  });
}

export default { batchIncidents };
