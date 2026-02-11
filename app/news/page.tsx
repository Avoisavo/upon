
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface NewsItem {
    title: string;
    subtitle?: string;
    description: string;
    image: string;
}

interface NewsData {
    featured: NewsItem;
    secondary: NewsItem[];
}

export default function NewsPage() {
    const [comment, setComment] = useState("");
    const [newsData, setNewsData] = useState<NewsData | null>(null);

    useEffect(() => {
        fetch("/data/news.json")
            .then((res) => res.json())
            .then((data) => setNewsData(data))
            .catch((err) => console.error("Error loading news data:", err));
    }, []);

    if (!newsData) return <div className="min-h-screen bg-white flex items-center justify-center font-black italic text-black uppercase">Loading...</div>;

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-10">
            {/* GTA 3 Style Header (Light Theme) */}
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 px-4 py-4 flex items-center justify-between border-b-2 border-black">
                <div className="w-10 h-10 relative">
                    <Image src="/images/gta3_wanted_star_icon_1770812945055.png" alt="Star" width={40} height={40} className="invert" />
                </div>
                <div className="text-center">
                    <h1 className="text-xl font-black text-black italic tracking-tighter uppercase" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>
                        UP DAILY NEWS
                    </h1>
                    <p className="text-[10px] font-bold text-black tracking-[0.2em] mt-0.5 opacity-60">FEBRUARY 10, 2026</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-black/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>
                    <div className="w-10 h-10 relative">
                        <Image src="/images/gta3_wanted_star_icon_1770812945055.png" alt="Star" width={40} height={40} className="invert" />
                    </div>
                </div>
            </header>

            <main className="pt-24 px-4 space-y-6 max-w-[500px] mx-auto">
                {/* Featured Heist Card */}
                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_#000] overflow-hidden transition-all hover:bg-gray-50">
                    <div className="p-4 text-center space-y-1">
                        <h2 className="text-2xl font-black italic tracking-tighter text-black uppercase">
                            {newsData.featured.title}
                        </h2>
                        <p className="text-sm font-bold text-black/80 uppercase">{newsData.featured.subtitle}</p>
                        <p className="text-[11px] text-black/40 font-mono italic">{newsData.featured.description}</p>
                    </div>
                    <div className="relative aspect-[16/9] w-full border-y-2 border-black">
                        <Image
                            src={newsData.featured.image}
                            alt={newsData.featured.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 flex gap-1">
                            <div className="w-10 h-1 bg-blue-600"></div>
                            <div className="w-6 h-1 bg-red-600"></div>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 gap-4">
                    {newsData.secondary.map((item, idx) => (
                        <div key={idx} className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden flex flex-col group active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_#000] transition-all">
                            <div className="p-3 text-center space-y-1">
                                <h3 className="text-[12px] font-black italic text-black uppercase tracking-tight leading-none">{item.title}</h3>
                                <p className="text-[9px] text-black/50 font-bold uppercase leading-tight mt-1">{item.description}</p>
                            </div>
                            <div className="relative aspect-square w-full mt-auto border-t-2 border-black">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-all duration-300"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed News Section */}
                <div className="bg-black text-white p-4 flex items-center justify-between border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-3">
                        <Image src="/images/gta3_wanted_star_icon_1770812945055.png" alt="Mini" width={24} height={24} />
                        <span className="text-[10px] font-black text-white italic uppercase tracking-wider">EGG OF THE DAY</span>
                        <span className="text-sm font-bold ml-2 text-white italic">DETAILED DOSSIER 👇</span>
                    </div>
                </div>

                {/* Footer Info Area */}
                <div className="text-[11px] text-black/30 px-2 font-mono uppercase tracking-wider pb-10">
                    <p>LIBERTY CITY NEWS CORP 2026.2.10 REF: @TCP_MAPS <span className="text-black font-black cursor-pointer underline decoration-2 decoration-black/10">READ MORE</span></p>
                    <div className="flex items-center gap-2 mt-4">
                        <span className="bg-black/5 px-2 py-0.5 border border-black/10 text-[9px] font-bold">LCPD NEWSROOM</span>
                        <span className="text-black font-black cursor-pointer hover:underline">INVESTIGATE UNIT</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
