import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Descubra e Compartilhe
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">Comandos para IA</span>
      </h1>
      <p className="desc text-center text-xl sm:text-2xl">
        Promptopia é uma ferramenta open source de comandos para IA moderanas.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
