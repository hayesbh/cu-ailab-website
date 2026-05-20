import { withBasePath } from '@/lib/paths';
import Link from 'next/link';

export default function JoinUsPage() {
  return (
    <div className="min-h-screen">
        {/* Simple Hero */}
        <div className="relative h-[60vh] min-h-[600px] w-full flex items-end justify-center overflow-hidden bg-black pb-12">
            <img 
                src={withBasePath("/ai-at-boulder.jpg")} 
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
                    <div className="flex flex-col bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
                        <div className="w-12 h-12 bg-background-alt dark:bg-card-dark rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Prospective Students</h3>
                        <p className="text-text-muted dark:text-text-muted-dark mb-8 text-sm leading-relaxed">
                            We are always looking to recruit MS and PhD students passionate about artificial intelligence, machine learning, robotics, and related fields.
                        </p>
                        
                        
                        <div className="mt-auto">
                            <a 
                                href="https://www.colorado.edu/cs/admissions/graduate-admissions/how-apply"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity text-sm inline-block text-center"
                            >
                                Apply to Grad School
                            </a>
                        </div>
                    </div>

                    {/* Postdoc Card */}
                    <div className="flex flex-col bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
                         <div className="w-12 h-12 bg-background-alt dark:bg-card-dark rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">science</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Postdocs & Researchers</h3>
                        <p className="text-text-muted dark:text-text-muted-dark mb-8 text-sm leading-relaxed">
                            Join us as a postdoctoral scholar or research scientist. Collaborate on cutting-edge grants and mentor students. Please visit our individual faculty groups' websites to see available positions.
                        </p>
                        
                        <div className="mt-auto">
                            <Link 
                                href="/people"
                                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity text-sm inline-block text-center"
                            >
                                View Faculty Page
                            </Link>
                        </div>
                    </div>

                    {/* Faculty Card */}
                    <div className="flex flex-col bg-white dark:bg-background-dark p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-transparent hover:border-primary/20">
                         <div className="w-12 h-12 bg-background-alt dark:bg-card-dark rounded-full flex items-center justify-center mb-6">
                            <span className="material-symbols-outlined text-2xl">podium</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-black dark:text-white">Faculty Positions</h3>
                        <p className="text-text-muted dark:text-text-muted-dark mb-8 text-sm leading-relaxed">
                            The Department of Computer Science and Colorado AI Lab are regularly looking for tenure-track faculty to lead new research directions. Details about open positions can be found on the CS department website.
                        </p>
                        
                        <div className="mt-auto">
                            <a 
                                href="https://www.colorado.edu/cs/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded hover:opacity-90 transition-opacity text-sm inline-block text-center"
                            >
                                See Faculty Postings
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-black dark:text-white mb-3">Point of Contact</h3>
                    <p className="text-text-muted dark:text-text-muted-dark">
                        Prof. Brad Hayes &middot;{' '}
                        <a
                            href="mailto:bradley.hayes@colorado.edu"
                            className="font-semibold border-b-2 border-primary hover:text-primary transition-colors text-black dark:text-white pb-0.5"
                        >
                            bradley.hayes@colorado.edu
                        </a>
                    </p>
                </div>
            </div>
        </section>

        <section className="py-24 bg-white dark:bg-background-dark overflow-hidden">
             <div className="mx-auto max-w-[1200px] px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1">
                    <span className="text-primary font-bold text-xs uppercase tracking-widest mb-2 block">Why Boulder?</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 leading-tight">Research, <i>&nbsp;Elevated</i>.</h2>
                    <p className="text-lg text-text-muted dark:text-text-muted-dark mb-6">
                        Located at the base of the Rocky Mountains, CU Boulder offers an unparalleled quality of life. Colorado AI Lab members enjoy 300 days of sunshine, world-class hiking and skiing, and a vibrant downtown just minutes from the lab.
                    </p>
                    <p className="text-lg text-text-muted dark:text-text-muted-dark mb-8">
                        Beyond the outdoors, Boulder is a burgeoning tech hub with heavy industry presence from Google, Apple, and Amazon, providing ample collaboration opportunities for our researchers.
                    </p>
                    <a href="https://www.colorado.edu/" className="font-bold border-b-2 border-primary hover:text-primary transition-colors text-black dark:text-white pb-1 inline-flex items-center gap-1">
                        Explore Campus Life <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </a>
                </div>
                <div className="flex-1 relative">
                    <div className="columns-2 gap-4">
                        <img src={withBasePath("/action-photos/ai-6.png")} className="rounded-2xl w-full object-cover shadow-lg break-inside-avoid mb-4" />
                        <img src={withBasePath("/action-photos/ai-4.png")} className="rounded-2xl w-full object-cover shadow-lg break-inside-avoid mb-4" />
                        <img src={withBasePath("/action-photos/ai-5.png")} className="rounded-2xl w-full object-cover shadow-lg break-inside-avoid mb-4" />
                        <img src={withBasePath("/action-photos/ai-1.png")} className="rounded-2xl w-full object-cover shadow-lg break-inside-avoid mb-4" />
                        <img src={withBasePath("/action-photos/ai-2.png")} className="rounded-2xl w-full object-cover shadow-lg break-inside-avoid mb-4" />
                        <img src={withBasePath("/action-photos/ai-3.png")} className="rounded-2xl w-full object-cover shadow-lg break-inside-avoid mb-4" />
                    </div>
                </div>
             </div>
        </section>
    </div>
  );
}
