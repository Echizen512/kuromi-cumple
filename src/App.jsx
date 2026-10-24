'use client'

import React, { useState, useEffect, useRef } from 'react'

const KUROMI_IMG = "/kuromi.png"
// Coloca tu archivo de Harry Potter en public/musica.mp3
const MUSIC_SRC = "/musica.mp3"

const RAZONES = [
  {
    id: 1,
    title: "Vocación de ayudar",
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
      </svg>
    ),
    text: "Estudiaste dos carreras, ambas orientadas por completo a servir y cuidar: Terapista Ocupacional y Fisioterapia. Dedicas tu día a día a mejorar vidas, y no te alcanzas a imaginar la inmensa admiración que me genera ver tu entrega, tu conocimiento y esa forma tan noble en que te das a los demás.",
    magicalNote: "Un don sanador digno de la más alta magia."
  },
  {
    id: 2,
    title: "Tu valentía secreta",
    icon: (
      <svg className="w-8 h-8 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    text: "Cuando llegaste a la Academia, sintiendo miedo y esa ansiedad que a veces nos frena, decidiste no dar marcha atrás. Te quedaste. Aunque hoy en día ese espacio te haga tan feliz, nada de esto existiría si no hubieses tenido el inmenso valor de cruzar la puerta el primer día. Tu valentía para empezar es inspiradora.",
    magicalNote: "El valor no es la ausencia de miedo, sino la decisión de avanzar."
  },
  {
    id: 3,
    title: "Encontrar belleza donde otros no ven",
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    ),
    text: "Tu amor por los animales es muy lindo. Incluso aquellas especies que la gente suele tachar de \"feas\" o extrañas, tú logras encontrarles gracia, ternura y belleza. Me encanta cómo te brillan los ojos y cómo te emocionas cuando hablas de ellas. Tienes una sensibilidad única que el mundo necesita más.",
    magicalNote: "La magia de ver con el corazón, no con los ojos."
  },
  {
    id: 4,
    title: "La fuerza de tus palabras",
    icon: (
      <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "Tienes una elocuencia y una forma de expresarte que me parecen increíbles. Ya sea para debatir sobre tu carrera, defender una idea o hablar de cualquier cosa, posees una facilidad asombrosa para decir exactamente lo que piensas. Te haces escuchar con una naturalidad que atrapa.",
    magicalNote: "Tus palabras tienen el poder de los grandes hechizos."
  },
  {
    id: 5,
    title: "Autenticidad sin filtros",
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    text: "No tienes el más mínimo miedo a mostrar tus gustos abiertamente, por muy \"inusuales\" o fuera de lo común que puedan parecerle al resto. Si algo te gusta, lo celebras; si algo no, lo dices de frente sin rodeos. No te da miedo ser tú misma en un mundo lleno de copias. Eres real, y eso es magnífico.",
    magicalNote: "Como una auténtica Ravenclaw: libre, sabia y original."
  },
  {
    id: 6,
    title: "Tu absoluta libertad",
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0l-4-4a4 4 0 015.656-5.656l4 4a4 4 0 010 5.656z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
    text: "Es una de las cosas más bonitas que tienes. En la academia, cuando estás esperando pareja o simplemente sentada, te pones a bailar sola, a disfrutar de la música a tu manera. Brincas, te mueves y sonríes sin que te importe si el paso es perfecto o qué digan los demás. Eres feliz y libre en tu propio mundo.",
    magicalNote: "Tu danza es tu propio y más alegre conjuro."
  },
  {
    id: 7,
    title: "Un corazón de oro puro",
    icon: (
      <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    ),
    text: "Basta con pasar un poco de tiempo contigo para darse cuenta del tipo de persona que eres por dentro. Tu empatía, la ternura que escondes detrás de tu carácter y tu nobleza natural. No todo el mundo tiene esa capacidad de preocuparse genuinamente por el bienestar ajeno, tú lo haces sin esfuerzo.",
    magicalNote: "El metal más preciado no se compara con tu bondad."
  },
  {
    id: 8,
    title: "Brillantez y pasión por saber",
    icon: (
      <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    text: "Eres increíblemente inteligente y curiosa. Recuerdo con muchísima admiración cuando me hablabas del diplomado que estabas estudiando; lo hacías con una pasión y una intensidad tan genuinas que era imposible no contagiarse. Siempre quieres aprender, crecer y ser mejor. Esa chispa es de admirar.",
    magicalNote: "Una mente brillante que nunca deja de buscar respuestas."
  },
  {
    id: 9,
    title: "Energía inalcanzable (Terreneitor)",
    icon: (
      <svg className="w-8 h-8 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    text: "¡No joda, es que eres súper activa! La verdadera Terreneitor. Te levantas, vas al gimnasio, trabajas, vas a bailar, te animas a trotar... Tienes la energía de un conejito de Duracell. Y esa sed de adrenalina me parece increíble. No hay nada que te detenga.",
    magicalNote: "Fuerza, velocidad y emoción todoterreno."
  },
  {
    id: 10,
    title: "Tu hermosa sonrisa",
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0l-4-4a4 4 0 015.656-5.656l4 4a4 4 0 010 5.656z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8" />
      </svg>
    ),
    text: "Y al final del día, la verdad es que me encanta tu sonrisa. Tiene el poder de desarmar cualquier mal rato y de iluminar todo el lugar. Ver que la estás pasando bien y que te ríes con ganas hace que cualquier intento, cualquier rato invertido y cualquier pequeño esfuerzo por provocártela valgan absoluta y completamente la pena.",
    magicalNote: "Tu sonrisa es, sin duda, mi magia favorita."
  }
]

export default function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [currentReason, setCurrentReason] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const toggleAudio = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.log("Audio play error:", err)
      })
    }
  }

  const changePage = (newPage) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentPage(newPage)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 280)
  }

  const startJourney = () => {
    if (audioRef.current && !isPlaying) {
      audioRef.current.volume = 0.55
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
    changePage('letter')
  }

  const nextReason = () => {
    if (currentReason < RAZONES.length - 1) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentReason(prev => prev + 1)
        setIsTransitioning(false)
      }, 250)
    } else {
      changePage('final')
    }
  }

  const prevReason = () => {
    if (currentReason > 0) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentReason(prev => prev - 1)
        setIsTransitioning(false)
      }, 250)
    } else {
      changePage('letter')
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#05070e] text-[#e2e8f0] font-sans flex items-center justify-center p-4 py-12 overflow-x-hidden select-none">
      
      {/* Audio nativo */}
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      {/* Luces y partículas ambientales fijas */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-96 sm:w-125 h-96 sm:h-125 bg-blue-600/15 rounded-full blur-[110px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 sm:w-125 h-96 sm:h-125 bg-purple-600/15 rounded-full blur-[110px] animate-pulse"></div>
        
        <span className="absolute top-[15%] left-[12%] w-1.5 h-1.5 bg-blue-300 rounded-full animate-ping opacity-60"></span>
        <span className="absolute top-[25%] right-[18%] w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-70"></span>
        <span className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-indigo-200 rounded-full animate-pulse opacity-50"></span>
        <span className="absolute bottom-[30%] right-[15%] w-2 h-2 bg-amber-200 rounded-full animate-ping opacity-40"></span>
      </div>

      {/* Control de música fijo arriba a la derecha */}
      <button 
        onClick={toggleAudio}
        className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 bg-slate-900/90 hover:bg-slate-800 border border-blue-500/35 rounded-full backdrop-blur-md text-blue-300 text-xs shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all cursor-pointer"
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? (
          <>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <svg className="w-4 h-4 text-blue-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span className="hidden sm:inline font-mono">Música ON</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
            <span className="hidden sm:inline font-mono text-slate-400">Música OFF</span>
          </>
        )}
      </button>

      {/* Contenedor interactivo principal */}
      <div className={`relative z-10 w-full flex items-center justify-center transition-all duration-300 ease-out transform ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        
        {/* --- PÁGINA 1: BIENVENIDA --- */}
        {currentPage === 'welcome' && (
          <main className="max-w-md w-full flex flex-col items-center text-center bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.25)] relative my-auto">
            
            <div className="w-full flex justify-center items-center mb-4 sm:mb-6 relative">
              <div className="absolute w-36 sm:w-44 h-36 sm:h-44 bg-blue-500/25 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
              <img 
                src={KUROMI_IMG} 
                alt="Kuromi Ravenclaw" 
                className="w-36 sm:w-44 h-auto relative z-10 block mx-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.4)] transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="w-full flex justify-center mb-3">
              <span className="px-3.5 py-1 bg-blue-950/90 border border-blue-500/40 text-blue-300 rounded-full text-xs font-semibold uppercase tracking-widest shadow-inner">
                Hechizo de Cumpleaños
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-200 to-purple-400 mb-3 tracking-tight">
              ¡Feliz Cumpleaños!
            </h1>
            
            <p className="text-slate-300 text-sm leading-relaxed mb-6 px-2 sm:px-3">
              He preparado un pequeño y místico viaje para ti. Un espacio para recordarte que cada momento, cada sonrisa y cada esfuerzo por ti... vale absolutamente todo.
            </p>

            <button 
              onClick={startJourney}
              className="w-full py-3.5 sm:py-4 px-4 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer text-sm sm:text-base leading-tight"
            >
              ¡Juro solemnemente que mis intenciones no son buenas! ✨
            </button>
          </main>
        )}

        {/* --- PÁGINA 2: CARTA PREVIA --- */}
        {currentPage === 'letter' && (
          <main className="max-w-xl w-full bg-slate-900/85 backdrop-blur-xl p-6 sm:p-8 md:p-9 rounded-3xl border border-blue-500/30 shadow-[0_0_50px_rgba(59,130,246,0.25)] text-left flex flex-col md:flex-row gap-6 items-center my-auto">
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-3 sm:mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 fill-pink-500 animate-pulse" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg> 
                Un viaje para ti...
              </h2>
              
              <div className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>Hoy no es un día común, y por eso tampoco quería que el saludo lo fuera.</p>
                <p>
                  Quiero que sepas, antes de que sigas, que <strong className="text-blue-300">contigo cada pequeño esfuerzo vale.</strong> Vale la pena invertir el tiempo que haga falta, planear lo que sea, con tal de sacarte una sonrisa.
                </p>
                <p>
                  Tienes una esencia demasiado única y real que no se encuentra dos veces en la vida. Por eso, he guardado en este pergamino mágico algunas de las muchísimas razones que te hacen tan infinitamente especial.
                </p>
                <p className="italic text-indigo-300">¿Me acompañas a descubrirlas?</p>
              </div>

              <button 
                onClick={() => changePage('potions')}
                className="mt-5 sm:mt-6 flex items-center justify-center gap-2 w-full py-3.5 bg-blue-950 border border-blue-500/40 text-blue-300 hover:bg-blue-900/60 font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] transition-all cursor-pointer text-sm sm:text-base"
              >
                Comenzar el viaje 
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className="flex md:flex flex-col items-center justify-center w-28 sm:w-36 md:w-40 relative">
              <div className="absolute w-24 sm:w-32 h-24 sm:h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <img 
                src={KUROMI_IMG} 
                alt="Kuromi Mágica" 
                className="w-full max-w-28 sm:max-w-35 h-auto relative z-10 block mx-auto drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              />
            </div>
          </main>
        )}

        {/* --- PÁGINA 3: LAS 10 RAZONES --- */}
        {currentPage === 'potions' && (
          <main className="max-w-xl w-full bg-slate-900/90 backdrop-blur-2xl p-5 sm:p-7 md:p-8 rounded-3xl border border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.3)] flex flex-col items-center justify-between min-h-115 sm:min-h-125 my-auto">
            
            {/* Header de progreso */}
            <div className="w-full flex items-center justify-between mb-3 sm:mb-4 border-b border-blue-950/90 pb-3">
              <div>
                <span className="text-[11px] sm:text-xs text-blue-400 font-mono tracking-widest uppercase block mb-0.5">
                  Grimorio de Razones
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Página {currentReason + 1} de {RAZONES.length}
                </h3>
              </div>
              <div className="flex gap-1 sm:gap-1.5">
                {RAZONES.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === currentReason ? 'w-5 sm:w-6 bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'w-1.5 sm:w-2 bg-slate-800'}`}
                  />
                ))}
              </div>
            </div>

            {/* Contenido de la Razón */}
            <div className="w-full flex flex-col items-center my-auto py-2">
              <div className="relative mb-3 sm:mb-5 flex justify-center">
                <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-xl animate-pulse scale-150"></div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-950/90 border border-blue-500/40 flex items-center justify-center relative z-10 shadow-inner transform hover:rotate-6 transition-transform">
                  {RAZONES[currentReason].icon}
                </div>
              </div>

              <h4 className="text-lg sm:text-2xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-300 via-indigo-100 to-purple-300 text-center mb-3 sm:mb-4 leading-tight">
                {RAZONES[currentReason].id}. {RAZONES[currentReason].title}
              </h4>

              <div className="bg-slate-950/70 border border-blue-950/90 rounded-2xl p-4 sm:p-5 w-full mb-3 sm:mb-4 shadow-inner">
                <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed text-center font-serif italic">
                  "{RAZONES[currentReason].text}"
                </p>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-blue-300 bg-blue-950/40 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-blue-500/20 text-center">
                <span className="text-amber-400">✦</span>
                <span>{RAZONES[currentReason].magicalNote}</span>
              </div>
            </div>

            {/* Navegación */}
            <div className="w-full flex gap-2.5 sm:gap-3 mt-4">
              <button 
                onClick={prevReason}
                className="flex-1 py-3 px-3 sm:px-4 bg-slate-950 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 font-semibold rounded-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg> 
                {currentReason > 0 ? "Anterior" : "Volver"}
              </button>

              <button 
                onClick={nextReason}
                className="flex-1 py-3 px-3 sm:px-4 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm cursor-pointer"
              >
                {currentReason < RAZONES.length - 1 ? (
                  <>
                    Siguiente 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </>
                ) : (
                  <>Culminar viaje ✨</>
                )}
              </button>
            </div>
          </main>
        )}

        {/* --- PÁGINA 4: CIERRE FINAL --- */}
        {currentPage === 'final' && (
          <main className="max-w-md w-full flex flex-col items-center text-center bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-blue-500/40 shadow-[0_0_60px_rgba(59,130,246,0.3)] relative my-auto">
            <div className="w-full flex justify-center items-center mb-4 sm:mb-5 relative">
              <div className="absolute w-32 sm:w-36 h-32 sm:h-36 bg-indigo-500/25 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
              <img 
                src={KUROMI_IMG} 
                alt="Kuromi Hechicera Final" 
                className="w-32 sm:w-40 h-auto relative z-10 block mx-auto drop-shadow-[0_0_20px_rgba(99,102,241,0.5)] transform hover:rotate-3 transition-transform duration-300"
              />
            </div>

            <span className="text-amber-400 font-mono text-xs tracking-widest uppercase block mb-1.5 sm:mb-2">
              Misión Cumplida ✨
            </span>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-purple-300 to-indigo-300 mb-3 sm:mb-4 tracking-tight">
              Gracias por ser tú
            </h2>

            <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 px-1 sm:px-2">
              <p>
                Espero que este pequeño detalle te haya recordado la inmensa luz que tienes y lo hermosa que es tu autenticidad, tu energía y tu valentía.
              </p>
              <p>
                Nunca dudes de lo valiosa que eres, de lo mucho que inspiras a quienes te rodean ni de que <strong className="text-blue-300">lo vale absolutamente todo</strong> por verte feliz.
              </p>
              <p className="font-semibold text-blue-300 text-sm sm:text-base pt-1">
                ¡Que tengas el cumpleaños más mágico y maravilloso de todos! 🎂✨
              </p>
            </div>

            <div className="w-full flex gap-2.5 sm:gap-3">
              <button 
                onClick={() => {
                  setCurrentReason(0)
                  changePage('potions')
                }}
                className="flex-1 py-3 px-2 sm:px-3 bg-slate-950 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 font-semibold rounded-xl hover:bg-slate-900 transition-all text-xs sm:text-sm cursor-pointer"
              >
                Releer razones
              </button>
              <button 
                onClick={() => changePage('welcome')}
                className="flex-1 py-3 px-2 sm:px-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all text-xs sm:text-sm cursor-pointer"
              >
                Comenzar de nuevo
              </button>
            </div>
          </main>
        )}
      </div>
    </div>
  )
}