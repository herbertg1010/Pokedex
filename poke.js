const tiposPT = {
  normal: "Normal",
  fire: "Fogo",
  water: "Água",
  electric: "Elétrico",
  grass: "Planta",
  ice: "Gelo",
  fighting: "Lutador",
  poison: "Venenoso",
  ground: "Terrestre",
  flying: "Voador",
  psychic: "Psíquico",
  bug: "Inseto",
  rock: "Pedra",
  ghost: "Fantasma",
  dragon: "Dragão",
  dark: "Sombrio",
  steel: "Aço",
  fairy: "Fada"
};

async function buscarpokemon(nomePokemon){
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nomePokemon.toLowerCase()}`);
    
    if (!resposta.ok){
      throw new Error('Pokémon não encontrado!');
    }

    const pokemon = await resposta.json();
    const nome = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const peso = pokemon.weight / 10;
    const altura = pokemon.height / 10;
    const tipoEN = pokemon.types[0].type.name;
    const tipo = tiposPT[tipoEN] || tipoEN;
    const imagem = pokemon.sprites.front_default;
    const forca = pokemon.base_experience;
    const hp = pokemon.stats.find(s => s.stat.name === 'hp').base_stat;
    const ataque = pokemon.stats.find(s => s.stat.name === 'attack').base_stat;
    const defesa = pokemon.stats.find(s => s.stat.name === 'defense').base_stat;
    const velocidade = pokemon.stats.find(s => s.stat.name === 'speed').base_stat;

    return {nome, peso, altura, tipo, imagem, forca, hp, ataque, defesa, velocidade};

  } catch(e){
    console.error(`Erro: ${e.message}`);
    return null;
  }
}

async function iniciar(){
  const input = document.getElementById('nomePokemon');
  const nomePokemon = input.value;

  const div = document.getElementById('dados');

  if (!nomePokemon){
    div.innerHTML = `<p>Digite o nome de um Pokémon</p>`;
    return;
  }

  const dados = await buscarpokemon(nomePokemon);

  if (!dados){
    div.innerHTML = `<p>Pokémon não encontrado 😢</p>`;
    return;
  }

  div.innerHTML = `
    <p>📛 Nome: ${dados.nome}</p>
    <p>⚖️ Peso: ${dados.peso} kg</p>
    <p>📏 Altura: ${dados.altura} m</p>
    <p>🔰 Tipo: ${dados.tipo}</p>
    <p>⭐ Experiência: ${dados.forca} xp</p>
    <p>❤️ Vida: ${dados.hp}</p>
    <p>⚔️ Ataque: ${dados.ataque}</p>
    <p>🛡️ Defesa: ${dados.defesa}</p>
    <p>⚡ Velocidade: ${dados.velocidade}</p>
    <img src="${dados.imagem}" alt="${dados.nome}"/>
  `;
}