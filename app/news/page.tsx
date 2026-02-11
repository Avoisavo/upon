
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
            <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 px-4 py-2 flex items-center justify-between border-b-2 border-black">
                <div className="w-8 h-8 bg-black/5 rounded-full" />
                <div className="text-center">
                    <h1 className="text-lg font-black text-black italic tracking-tighter uppercase" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>
                        UP DAILY NEWS
                    </h1>
                    <p className="text-[9px] font-bold text-black tracking-[0.2em] mt-0.5 opacity-60">FEBRUARY 10, 2026</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="text-black/40">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>
                    <div className="w-8 h-8 bg-black/5 rounded-full" />
                </div>
            </header>

            <main className="pt-20 px-4 space-y-4 max-w-[380px] mx-auto">
                {/* Featured Heist Card */}
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden transition-all hover:bg-gray-50">
                    <div className="p-3 text-center space-y-1">
                        <h2 className="text-xl font-black italic tracking-tighter text-black uppercase">
                            {newsData.featured.title}
                        </h2>
                        <p className="text-xs font-bold text-black/80 uppercase">{newsData.featured.subtitle}</p>
                        <p className="text-[10px] text-black/40 font-mono italic leading-tight">{newsData.featured.description}</p>
                    </div>
                    <div className="relative aspect-[16/9] w-full border-y-2 border-black bg-white">
                        <div className="absolute bottom-2 left-2 flex gap-1">
                            <div className="w-8 h-0.5 bg-blue-600"></div>
                            <div className="w-4 h-0.5 bg-red-600"></div>
                        </div>
                    </div>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-2 gap-3">
                    {newsData.secondary.map((item, idx) => (
                        <div key={idx} className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] overflow-hidden flex flex-col group active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all">
                            <div className="p-2 text-center space-y-1">
                                <h3 className="text-[11px] font-black italic text-black uppercase tracking-tight leading-none">{item.title}</h3>
                                <p className="text-[8px] text-black/50 font-bold uppercase leading-tight mt-1">{item.description}</p>
                            </div>
                            <div className="relative aspect-square w-full mt-auto border-t-2 border-black bg-white">
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed News Section */}
                <div className="bg-black text-white p-3 flex items-center justify-between border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-white/20 rounded-full" />
                        <span className="text-[9px] font-black text-white italic uppercase tracking-wider">EGG OF THE DAY</span>
                        <span className="text-xs font-bold ml-2 text-white italic">DETAILED DOSSIER 👇</span>
                    </div>
                </div>

                {/* Footer Info Area */}
                <div className="text-[10px] text-black/30 px-2 font-mono uppercase tracking-wider pb-6">
                    <p>LIBERTY CITY NEWS CORP 2026.2.10 REF: @TCP_MAPS <span className="text-black font-black cursor-pointer underline decoration-1 decoration-black/10">READ MORE</span></p>
                    <div className="flex items-center gap-2 mt-3">
                        <span className="bg-black/5 px-2 py-0.5 border border-black/10 text-[8px] font-bold">LCPD NEWSROOM</span>
                        <span className="text-black font-black cursor-pointer hover:underline">INVESTIGATE UNIT</span>
                    </div>
                </div>
            </main>
        </div>
    );
}
