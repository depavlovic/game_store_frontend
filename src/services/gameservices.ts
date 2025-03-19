
import type { GameModel } from '@/models/game.model';

export const filterGames = (games: GameModel[], searchQuery: string): GameModel[] => {
  if (!searchQuery) {
    return games;
  }
  
  const query = searchQuery.toLowerCase();
  
  return games.filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.short_description.toLowerCase().includes(query)
  );
};



