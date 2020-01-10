import { BehaviorSubject } from 'rxjs';

export const games$ = new BehaviorSubject(null);

export const updateGames = update => games$.next(update);
