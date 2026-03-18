//generate a customer component where there will be ss from public blackss.webp adn another whitess.webp which is dynamically shown based on theme and another is Perfect for friends ,teams ,communiteis text anot another dic big companies name. like gumroad meta facebook open ai 

"use client"

import Image from "next/image"

export default function Customer() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-100/50 via-white to-white dark:from-blue-950/20 dark:via-black dark:to-black py-20 px-4 sm:px-6 lg:px-8">
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Trusted by Everyone
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        From individual friends to global teams and communities
                    </p>
                </div>

                {/* Main showcase */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Left: Screenshots */}
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative rounded-2xl overflow-hidden shadow-xl">
                                <Image
                                    src="/blackss.webp"
                                    alt="Dark Theme Screenshot"
                                    width={300}
                                    height={300}
                                    className="w-full h-auto hidden dark:block object-cover rounded-2xl"
                                />
                                <Image
                                    src="/whitess.webp"
                                    alt="Light Theme Screenshot"
                                    width={300}
                                    height={300}
                                    className="w-full h-auto dark:hidden object-cover rounded-2xl"
                                />
                            </div>
                            <div className="flex flex-col gap-4 mt-8">
                                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-400 to-blue-600 p-6 text-white">
                                    <div className="text-2xl font-bold mb-2">5K+</div>
                                    <div className="text-sm opacity-90">Active Rooms</div>
                                </div>
                                <div className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-400 to-pink-600 p-6 text-white">
                                    <div className="text-2xl font-bold mb-2">∞</div>
                                    <div className="text-sm opacity-90">Watch Hours</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Use cases */}
                    <div className="space-y-6">
                        <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all bg-white dark:bg-gray-900/30 hover:shadow-lg">
                            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">👯 Friends</div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Watch your favorite shows and movies together without geographical barriers.
                            </p>
                        </div>
                        <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-purple-500/50 dark:hover:border-purple-500/50 transition-all bg-white dark:bg-gray-900/30 hover:shadow-lg">
                            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">🏢 Teams</div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Synchronize training videos and team meetings with perfect playback alignment.
                            </p>
                        </div>
                        <div className="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all bg-white dark:bg-gray-900/30 hover:shadow-lg">
                            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">🌍 Communities</div>
                            <p className="text-gray-600 dark:text-gray-400">
                                Host watch parties for your community with real-time engagement and interaction.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Companies */}
                <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
                    <p className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-8">
                        Loved by creators and teams from leading companies
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                        <div className="text-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50 transition">
                            <div className="font-bold text-gray-900 dark:text-white text-lg">Gumroad</div>
                        </div>
                        <div className="text-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50 transition">
                            <div className="font-bold text-gray-900 dark:text-white text-lg">Meta</div>
                        </div>
                        <div className="text-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50 transition">
                            <div className="font-bold text-gray-900 dark:text-white text-lg">OpenAI</div>
                        </div>
                        <div className="text-center p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900/50 transition">
                            <div className="font-bold text-gray-900 dark:text-white text-lg">Stripe</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}