'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const setProvider = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setProvider();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
          src="/assets/images/logo.svg"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Criar Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sair
            </button>
            <Link href="/profile">
              <Image
                width={37}
                height={37}
                className="rounded-full"
                src={session?.user.image}
                alt="Profile picture"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Entrar
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              width={37}
              height={37}
              className="rounded-full"
              src={session?.user.image}
              alt="Profile picture"
              onClick={() => setToggleMenu((prev) => !prev)}
            />
            {toggleMenu && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Perfil
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleMenu(false)}
                >
                  Criar Post
                </Link>
                <button
                  className="mt-5 w-full black_btn"
                  type="button"
                  onClick={() => {
                    setToggleMenu(false);
                    signOut();
                  }}
                >
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Entrar
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
