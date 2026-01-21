export default function JoinUsPage() {
  return (
    <div className="min-h-screen">
        {/* Simple Hero */}
        <div className="relative h-[60vh] min-h-[600px] w-full flex items-end justify-center overflow-hidden bg-black pb-12">
            <img 
                src="/ai-at-boulder.jpg" 
                className="absolute inset-0 w-full h-full object-cover"
                alt="AI at Boulder"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black"></div>
            
            <div className="relative z-10 text-center max-w-4xl px-4">
                <div className="bg-black/60 backdrop-blur-md rounded-[3rem] p-12">
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light">
                        Join a world-class research team innovating at the foot of the Rockies. We are looking for visionary students, researchers, and faculty.
                    </p>
                </div>
            </div>
        </div>

        <section className="py-24 bg-background-alt dark:bg-card-dark">
            <div className="mx-auto max-w-[1200px] px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Choose Your Path</h2>
                    <p className="text-text-muted dark:text-text-muted-dark text-lg">
                        Explore opportunities to join our vibrant academic community. Select your role below to see specific requirements and open positions.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* PhD Card */}
                    <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
                        <div className="w-12 h-12 bg-background-alt dark:bg-card-dark rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Prospective Students</h3>
                        <p className="text-text-muted dark:text-text-muted-dark mb-8 text-sm leading-relaxed">
                            We are actively recruiting MS and PhD students passionate about machine learning, NLP, and computer vision.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                             <details className="group">
                                <summary className="flex justify-between items-center font-bold text-xs uppercase tracking-wide cursor-pointer py-2 border-b border-border-light dark:border-border-dark">
                                    PhD Deadlines & Process
                                    <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="pt-2 pb-4 text-xs text-text-muted">
                                    Applications are due Dec 15th. Apply via the CS Department website.
                                </div>
                             </details>
                             <details className="group">
                                <summary className="flex justify-between items-center font-bold text-xs uppercase tracking-wide cursor-pointer py-2 border-b border-border-light dark:border-border-dark">
                                    Contacting Faculty
                                    <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="pt-2 pb-4 text-xs text-text-muted">
                                    Please read individual faculty websites before emailing.
                                </div>
                             </details>
                        </div>
                        
                        <div className="mt-8">
                            <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity text-sm">
                                Apply to Grad School
                            </button>
                        </div>
                    </div>

                    {/* Postdoc Card */}
                    <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
                         <div className="w-12 h-12 bg-background-alt dark:bg-card-dark rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">science</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Postdocs & Researchers</h3>
                        <p className="text-text-muted dark:text-text-muted-dark mb-8 text-sm leading-relaxed">
                            Join us as a postdoctoral scholar or research scientist. Collaborate on cutting-edge grants and mentor students.
                        </p>
                        
                        <div className="flex flex-col gap-3">
                             <details className="group">
                                <summary className="flex justify-between items-center font-bold text-xs uppercase tracking-wide cursor-pointer py-2 border-b border-border-light dark:border-border-dark">
                                    Current Openings
                                    <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="pt-2 pb-4 text-xs text-text-muted">
                                    We have two open positions in Robotics and NLP.
                                </div>
                             </details>
                        </div>
                        
                        <div className="mt-8">
                            <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity text-sm">
                                View Research Roles
                            </button>
                        </div>
                    </div>

                    {/* Faculty Card */}
                    <div className="bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
                         <div className="w-12 h-12 bg-background-alt dark:bg-card-dark rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">podium</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Faculty Positions</h3>
                        <p className="text-text-muted dark:text-text-muted-dark mb-8 text-sm leading-relaxed">
                            The Department of Computer Science and Colorado AI Lab are looking for tenure-track faculty to lead new research directions.
                        </p>
                        
                         <div className="flex flex-col gap-3">
                             <details className="group">
                                <summary className="flex justify-between items-center font-bold text-xs uppercase tracking-wide cursor-pointer py-2 border-b border-border-light dark:border-border-dark">
                                    Search Timeline
                                    <span className="material-symbols-outlined text-sm group-open:rotate-180 transition-transform">expand_more</span>
                                </summary>
                                <div className="pt-2 pb-4 text-xs text-text-muted">
                                    Interviews typically typically occur in Spring.
                                </div>
                             </details>
                        </div>

                        <div className="mt-8">
                            <button className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity text-sm">
                                See Faculty Postings
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
             <div className="mx-auto max-w-[1200px] px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">Why Boulder?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">Research meets <br/>Adventure.</h2>
                    <p className="text-lg text-text-muted dark:text-text-muted-dark mb-6">
                        Located at the base of the Rocky Mountains, CU Boulder offers an unparalleled quality of life. Colorado AI Lab members enjoy 300 days of sunshine, world-class hiking and skiing, and a vibrant downtown just minutes from the lab.
                    </p>
                    <p className="text-lg text-text-muted dark:text-text-muted-dark mb-8">
                        Beyond the outdoors, Boulder is a burgeoning tech hub with heavy industry presence from Google, Apple, and Amazon, providing ample collaboration opportunities for our researchers.
                    </p>
                    <a href="#" className="font-bold border-b-2 border-primary hover:text-primary transition-colors text-black dark:text-white pb-1 inline-flex items-center gap-1">
                        Explore Campus Life <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
                <div className="flex-1 relative">
                    <div className="grid grid-cols-2 gap-4">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSdWb_C_G3GHM6NJayjX0wPw5G6sQD9JhTxpEUlNC_wISRbxhVfincuAu6WEJ7pSo1makzk-YhiMC7FY0MWpNNSZR2MqEFmQdsbAF0NZHJgaWYZaXQoERroYNFgI91Wl55nZ3iXWd3YqDGimo7A_OTytOtBzNoCHDzSHZKCvRHt62gWteMOjmualNzi_KiHfq9agJiwxkuJ99boALSr_mLg1pB7yDC-2fXbV-73FBfniRShFwtbt8gAHa1xP-Va1kFUjbSMR4k8Kw" className="rounded-2xl w-full h-48 object-cover shadow-lg transform translate-y-8"/>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxD1K0L_4u9F_msTI6E0CKwOAhZuXZHeEwB1dim8opPlR8uB2N63xtrdXUIfEV6gIe5MlUIl6rHmE_uLesexDhiOencfhSbbjHH7K85Ek2mXQytRxMefJ5A2AD4Bm1qOOJyYHvn0LOOPa0I7Uwt5vLTucwPh6rNtCgKmH8Wmdx24hCosgQvLAIgV5xqPrmzAfDzaamGadjy6RRCQvy0M9NRqpzDOoIiOVI1qYkSZtpGsPoBuknLPChVUJGGkK1nEFk--aK4ssC1i8" className="rounded-2xl w-full h-48 object-cover shadow-lg"/>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXjf9IU6pAMV3KL6HuRuimC7j6Knu0kf1_VpABpvyBP8fe7WRIfcGr4KyBfpri7p82Pl0UPAyJ7ImoOvTHb_SwjZTNcFldJmhI-LmA6PQZh1neCBkOJj8MHlSLCS0qTR2311QyRVR7DAHYGDo2K2zwUKAQsmMN9UodJ982tRzjuX43AzJF6e29g9hIP3OPIH3l1L89IpHzQAw6PDiLdEidRdIToDBs04ByibtHMYFd0bn_O3UJM4m_AnW91_rvMkxTAyASddrdpaw" className="rounded-2xl w-full h-64 object-cover shadow-lg col-span-1 -mt-8"/>
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtZzh2aLebU_iIeIRGNbXssLiFlMj7np6ojK93SLM8Wn5sRM6dL25dVn5EwQUuPr8V3pGSyUm2PQqdXbZt5zHt5iBgPfel_yLXZ-8aEFAt-Sa5Z3DOOefPOkwMLoCEeCD_FqLOi5Xcvpn_HapKGgqiO6I4t419EVEQ5UuimGi_Wud3xEaKwdgy_MXALyJHhvLu9pZ7DiTzmgZPyqURKArQmkuGfFh_6VByxJrInQ0dPfvbxI0jbFLejIvheUMVN6PbsfS9L5xW4-0" className="rounded-2xl w-full h-40 object-cover shadow-lg col-span-1 mt-4"/>
                    </div>
                </div>
             </div>
        </section>
    </div>
  );
}
