import type { FunctionalComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import pokemonNames from '../data.json';

type VotingProps = {
  domain: string;
};

const Voting: FunctionalComponent<VotingProps> = ({ domain }) => {
  const pokemonNamesRef = useRef(pokemonNames);
  const [currentPokemon, setCurrentPokemon] = useState<{
    id: number;
    name: string;
  }>(pokemonNames[Math.floor(Math.random() * pokemonNamesRef.current.length)]);

  const handleVote = (vote: 'smash' | 'pass') => {
    const newPokemonNames = pokemonNamesRef.current.filter(
      (pokemon) => pokemon.name !== currentPokemon.name,
    );

    pokemonNamesRef.current = newPokemonNames;

    const newIndex = Math.floor(Math.random() * newPokemonNames.length);
    setCurrentPokemon(newPokemonNames[newIndex]);

    (async () => {
      try {
        const res = await fetch(`${domain}/vote.json`, {
          method: 'POST',
          body: JSON.stringify({
            pokemon_id: currentPokemon.id,
            vote: vote === 'smash',
          }),
        });

        if (import.meta.env.DEV) console.log(res);
      } catch (e) {
        if (import.meta.env.DEV) console.log(e);

        setCurrentPokemon((prev) => prev);
      }
    })();
  };

  console.log(pokemonNamesRef.current);

  return !!pokemonNamesRef.current.length ? (
    <div class="flex flex-col items-center gap-4">
      <h2 class="mb-10 text-3xl text-white">
        {currentPokemon.name.charAt(0).toUpperCase() +
          currentPokemon.name.slice(1)}
      </h2>

      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          currentPokemon.id + 1
        }.png`}
        alt="pokemon"
        height="300"
        width="300"
        style={{ imageRendering: 'pixelated' }}
      />

      <div class="flex w-full justify-between">
        <button
          class="rounded-md bg-green-500 py-3 px-6 text-white"
          onClick={() => handleVote('smash')}
        >
          Smash
        </button>

        <button
          class="rounded-md bg-red-500 py-3 px-6 text-white"
          onClick={() => handleVote('pass')}
        >
          Pass
        </button>
      </div>
    </div>
  ) : (
    <div class="text-center">
      <h1 class="text-3xl text-white">
        There are no Pokemons for you to vote for!
      </h1>
      <p class="text-white">You can refresh and do that again! :D</p>
    </div>
  );
};

export default Voting;
