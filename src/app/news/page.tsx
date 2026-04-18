"use client";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Globe, Home, Search, Calendar, Clock, User, ChevronRight, Loader2, X } from 'lucide-react';
import useNews from '@/hooks/useNews';
import { NewsArticle as DbNewsArticle } from '@/types/news.type';

interface NewsArticleView {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  time: string;
  author: string;
  category: string;
  story: string;
  article_url?: string;
  image: string;
  featured?: boolean;
}

interface NewsModalProps {
  article: NewsArticleView | null;
  isOpen: boolean;
  onClose: () => void;
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=250&fit=crop';

const getCategoryColorClass = (category: string) => {
  switch (category.toLowerCase()) {
    case 'academy':
      return 'bg-yellow-400 text-slate-900';
    case 'tournament':
      return 'bg-green-600 text-white';
    case 'player':
      return 'bg-red-500 text-white';
    case 'team':
      return 'bg-blue-600 text-white';
    case 'community':
      return 'bg-purple-600 text-white';
    case 'training':
      return 'bg-rose-600 text-white';
    case 'football':
      return 'bg-emerald-600 text-white';
    default:
      return 'bg-blue-600 text-white';
  }
};

const NewsModal: React.FC<NewsModalProps> = ({ article, isOpen, onClose }) => {
  useEffect(() => {
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/80 p-4 sm:p-6 flex items-center justify-center"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 border-b border-slate-200">
          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColorClass(article.category)}`}>
            {article.category}
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-slate-900">{article.title}</h2>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" />{article.date}</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.time}</span>
            <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" />{article.author}</span>
          </div>
        </div>

        <div className="p-6 sm:p-8 text-slate-700 leading-7">
          {article.story.split('\n').map((paragraph, index) => (
            <p key={`${article.id}-paragraph-${index}`} className="mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function NewsPage() {
  const [activeSection, setActiveSection] = useState<'hlssa' | 'news'>('hlssa');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [apiNews, setApiNews] = useState<NewsArticleView[]>([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticleView | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { news: dbNews, featuredNews, loading: dbLoading, error: dbError, fetchNews } = useNews();

  const newsPerPage = 20;

  const formatDbNews = (item: DbNewsArticle): NewsArticleView => {
    const sourceDate = item.created_at || item.date || new Date().toISOString();
    const parsedDate = Number.isNaN(Date.parse(sourceDate)) ? new Date() : new Date(sourceDate);
    const story = item.fullStory || '';

    return {
      id: item.id,
      title: item.title,
      excerpt: item.excerpt || (story ? `${story.slice(0, 200)}...` : ''),
      date: parsedDate.toISOString().split('T')[0],
      time: parsedDate.toTimeString().slice(0, 5),
      author: item.author || 'HLSSA Admin',
      category: item.category || 'Academy',
      article_url: item.article_url,
      story,
      image: item.image || FALLBACK_IMAGE,
      featured: item.featured,
    };
  };

  const fetchApiNews = useCallback(async () => {
    setApiLoading(true);
    setApiError(null);

    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const fromDate = thirtyDaysAgo.toISOString().split('T')[0];

      const guardianUrl = `https://content.guardianapis.com/search?q=football&from-date=${fromDate}&order-by=relevance&show-fields=thumbnail,trailText&page-size=${newsPerPage}&api-key=test`;
      const response = await fetch(guardianUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch news from Guardian API');
      }

      const data = await response.json();
      const results = data?.response?.results || [];

      const normalized: NewsArticleView[] = results.map((article: any, index: number) => {
        const pubDate = new Date(article.webPublicationDate);
        return {
          id: article.id || `guardian-${index}`,
          title: article.webTitle,
          excerpt: article.fields?.trailText || `${article.webTitle.slice(0, 150)}...`,
          date: pubDate.toISOString().split('T')[0],
          time: pubDate.toTimeString().slice(0, 5),
          author: 'The Guardian',
          category: 'Football',
          story: '',
          article_url: article.webUrl,
          image: article.fields?.thumbnail || FALLBACK_IMAGE,
          featured: false,
        };
      });

      setApiNews(normalized);
    } catch (error: any) {
      setApiError(error?.message || 'Unable to load international news right now.');
      setApiNews([]);
    } finally {
      setApiLoading(false);
    }
  }, [newsPerPage]);

  useEffect(() => {
    if (activeSection === 'news') {
      fetchApiNews();
    }
  }, [activeSection, fetchApiNews]);

  const allDbNews = useMemo(() => dbNews.map(formatDbNews), [dbNews]);

  const rawCurrentNews = useMemo(() => {
    return activeSection === 'hlssa' ? allDbNews : apiNews;
  }, [activeSection, allDbNews, apiNews]);

  const filteredNews = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return rawCurrentNews;

    return rawCurrentNews.filter((article) => {
      return (
        article.title.toLowerCase().includes(term) ||
        article.excerpt.toLowerCase().includes(term) ||
        article.category.toLowerCase().includes(term)
      );
    });
  }, [rawCurrentNews, searchTerm]);

  const featuredArticle = useMemo(() => {
    if (activeSection !== 'hlssa') return null;
    const fromFeatured = featuredNews[0] ? formatDbNews(featuredNews[0]) : null;
    return fromFeatured || filteredNews.find((article) => article.featured) || null;
  }, [activeSection, featuredNews, filteredNews]);

  const listWithoutFeatured = useMemo(() => {
    if (activeSection === 'news') return filteredNews;
    return filteredNews.filter((article) => !article.featured);
  }, [activeSection, filteredNews]);

  const totalPages = useMemo(() => {
    if (activeSection !== 'news') return 1;
    return Math.max(1, Math.ceil(listWithoutFeatured.length / newsPerPage));
  }, [activeSection, listWithoutFeatured.length, newsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const visibleNews = useMemo(() => {
    if (activeSection !== 'news') return listWithoutFeatured;
    const start = (currentPage - 1) * newsPerPage;
    return listWithoutFeatured.slice(start, start + newsPerPage);
  }, [activeSection, listWithoutFeatured, currentPage, newsPerPage]);

  const isLoading = activeSection === 'hlssa' ? dbLoading : apiLoading;
  const error = activeSection === 'hlssa' ? dbError : apiError;

  const handleReadMore = (article: NewsArticleView, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (activeSection === 'news' && article.article_url) {
      window.open(article.article_url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (article.article_url && article.article_url.trim() && article.article_url !== '#') {
      let url = article.article_url.trim();
      if (!/^https?:\/\//i.test(url)) {
        url = `https://${url}`;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (article.story && article.story.trim()) {
      setSelectedArticle(article);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="relative mt-20 md:mt-24 min-h-[340px] md:min-h-[420px] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=1350&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 md:pt-20 pb-12 text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full font-semibold text-sm bg-yellow-400 text-amber-900 shadow-lg shadow-yellow-500/30">
            Champions Updates
          </span>
          <h1 className="mt-6 text-4xl md:text-6xl font-black leading-tight">
            Crafting Hyderabad's Football News,
            <br />
            <span className="text-yellow-300">One Update at a Time.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate-100 max-w-3xl mx-auto">
            Stay updated with match reports, academy stories, international highlights, and player journeys.
          </p>
        </div>
      </header>

      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 font-semibold transition ${
              activeSection === 'news'
                ? 'bg-blue-700 border-blue-700 text-white shadow'
                : 'bg-white border-blue-700 text-blue-700 hover:bg-blue-50'
            }`}
            onClick={() => {
              setActiveSection('news');
              setCurrentPage(1);
              setSearchTerm('');
            }}
          >
            <Globe className="w-4 h-4" />
            International News
          </button>
          <button
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border-2 font-semibold transition ${
              activeSection === 'hlssa'
                ? 'bg-blue-700 border-blue-700 text-white shadow'
                : 'bg-white border-blue-700 text-blue-700 hover:bg-blue-50'
            }`}
            onClick={() => {
              setActiveSection('hlssa');
              setCurrentPage(1);
              setSearchTerm('');
            }}
          >
            <Home className="w-4 h-4" />
            HLSSA News
          </button>
        </div>
      </nav>

      <section className="bg-white border-b border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={`Search ${activeSection === 'hlssa' ? 'HLSSA' : 'international'} news...`}
              className="w-full rounded-full border-2 border-slate-200 bg-slate-50 focus:bg-white px-12 py-3.5 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center text-slate-600">
          <Loader2 className="w-10 h-10 animate-spin text-blue-700" />
          <p className="mt-4 text-lg font-medium">Loading {activeSection === 'hlssa' ? 'HLSSA' : 'international'} news...</p>
        </div>
      )}

      {!isLoading && featuredArticle && activeSection === 'hlssa' && (
        <section className="py-14 bg-gradient-to-br from-slate-50 to-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-black text-center text-slate-900">Featured News</h2>
            <div className="mt-8 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-red-600 text-white">Featured</span>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColorClass(featuredArticle.category)}`}>
                    {featuredArticle.category}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight">{featuredArticle.title}</h3>
                <p className="mt-4 text-slate-600 leading-7">{featuredArticle.excerpt}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" />{featuredArticle.date}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{featuredArticle.time}</span>
                  <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" />{featuredArticle.author}</span>
                </div>
                <button
                  onClick={(event) => handleReadMore(featuredArticle, event)}
                  className="mt-6 inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-full font-semibold shadow-lg"
                >
                  Read Full Story <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-72 md:h-80 object-cover rounded-2xl border border-slate-100"
                onError={(event) => {
                  event.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>
          </div>
        </section>
      )}

      {!isLoading && (
        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                {activeSection === 'hlssa' ? 'HLSSA Academy News' : 'International Football News'}
              </h2>
              <p className="mt-2 text-slate-500">
                {listWithoutFeatured.length} {listWithoutFeatured.length === 1 ? 'article' : 'articles'} found
              </p>
              {activeSection === 'news' && (
                <p className="mt-1 text-xs text-slate-500">From The Guardian - past 30 days - relevance sorted</p>
              )}
            </div>

            {error && (
              <div className="max-w-3xl mx-auto rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <h3 className="text-xl font-bold text-red-700">Failed to load news</h3>
                <p className="mt-2 text-red-600">{error}</p>
                <button
                  onClick={() => {
                    if (activeSection === 'hlssa') {
                      fetchNews();
                    } else {
                      fetchApiNews();
                    }
                  }}
                  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-semibold"
                >
                  Retry Loading News
                </button>
              </div>
            )}

            {!error && visibleNews.length === 0 && (
              <div className="text-center text-slate-500 py-16 text-lg">
                {activeSection === 'hlssa'
                  ? 'No HLSSA news articles found yet. Please check back soon.'
                  : 'No international articles found for this search.'}
              </div>
            )}

            {!error && visibleNews.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {visibleNews.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200 hover:shadow-xl transition cursor-pointer"
                    onClick={() => {
                      if (activeSection === 'news' && article.article_url) {
                        window.open(article.article_url, '_blank', 'noopener,noreferrer');
                        return;
                      }
                      if (article.article_url && article.article_url.trim() && article.article_url !== '#') {
                        let url = article.article_url.trim();
                        if (!/^https?:\/\//i.test(url)) {
                          url = `https://${url}`;
                        }
                        window.open(url, '_blank', 'noopener,noreferrer');
                        return;
                      }
                      if (article.story && article.story.trim()) {
                        setSelectedArticle(article);
                        setIsModalOpen(true);
                      }
                    }}
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-52 object-cover"
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="p-5">
                      <div className="mb-3">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColorClass(article.category)}`}>
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 leading-snug">{article.title}</h3>
                      <p className="mt-3 text-slate-600 line-clamp-3">{article.excerpt}</p>
                      <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{article.date}</span>
                        <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{article.time}</span>
                        <span className="inline-flex items-center gap-1"><User className="w-3.5 h-3.5" />{article.author}</span>
                      </div>
                      <button
                        onClick={(event) => handleReadMore(article, event)}
                        className="mt-5 inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full text-sm font-semibold"
                      >
                        Read Full Story <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {!error && activeSection === 'news' && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 hover:text-white"
                >
                  Previous
                </button>
                <span className="text-slate-600 font-medium">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border-2 border-blue-700 text-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 hover:text-white"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <NewsModal article={selectedArticle} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}