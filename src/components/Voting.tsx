import type { FunctionalComponent } from 'preact';
import { useRef, useState } from 'preact/hooks';
import pokemonNames from '../data.json';

type Pokemon = {
  id: number;
  name: string;
};

type VotingProps = {
  domain: string;
};

const Voting: FunctionalComponent<VotingProps> = ({ domain }) => {
  const pokemonNamesRef = useRef(pokemonNames);
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon>(
    pokemonNames[Math.floor(Math.random() * pokemonNamesRef.current.length)],
  );

  const [image, setImage] = useState(
    (() => {
      const tempImage = new Image();
      tempImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon.id}.png`;
      return tempImage;
    })(),
  );

  const nextPokemon = useRef(
    (() => {
      const newPokemonNames = pokemonNamesRef.current.filter(
        (pokemon) => pokemon.id !== currentPokemon.id,
      );

      return newPokemonNames[
        Math.floor(Math.random() * newPokemonNames.length)
      ];
    })(),
  );

  const nextImage = useRef(
    (() => {
      const tempImage = new Image();
      tempImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${nextPokemon.current.id}.png`;
      return tempImage;
    })(),
  );

  const handleVote = (vote: 'smash' | 'pass') => {
    const newPokemonNames = pokemonNamesRef.current.filter(
      (pokemon) =>
        pokemon.id !== currentPokemon.id &&
        pokemon.id !== nextPokemon.current.id,
    );
    pokemonNamesRef.current = newPokemonNames;

    setCurrentPokemon(nextPokemon.current);
    setImage(nextImage.current);

    if (!!newPokemonNames.length) {
      const newPokemon =
        newPokemonNames[Math.floor(Math.random() * newPokemonNames.length)];
      nextPokemon.current = newPokemon;

      const newImage = new Image();
      newImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${newPokemon.id}.png`;
      nextImage.current = newImage;
    }

    (async () => {
      const res = await fetch(`${domain}/vote.json`, {
        method: 'POST',
        body: JSON.stringify({
          pokemon_id: currentPokemon.id,
          vote: vote === 'smash',
        }),
      });

      if (import.meta.env.DEV) console.log(res);
    })();
  };

  return !!pokemonNamesRef.current.length ? (
    <div class="flex flex-col items-center gap-4">
      <h2 class="mb-10 text-3xl text-white">
        {currentPokemon.name.charAt(0).toUpperCase() +
          currentPokemon.name.slice(1)}
      </h2>

      <img
        src={image.src}
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
