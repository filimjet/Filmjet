import React, { useState, useEffect } from 'react';
import { Search, Home, Film, Tv, List, TrendingUp, User, Settings, Plus, Edit, Trash2, X, Play, Star, Clock, Calendar, Upload } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: string;
  genre: string;
  category: 'popular' | 'trending' | 'new';
  description: string;
  videoFile?: File | string;
  videoUrl?: string;
  rating?: number;
  duration?: string;
  type: 'movie' | 'series';
}

interface AdminState {
  isVisible: boolean;
  currentView: 'list' | 'add' | 'edit';
  editingMovie?: Movie;
}

const initialMovies: Movie[] = [
  {
    id: '1',
    title: 'Spider-Man: Far From Home',
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '2019',
    genre: 'Action, Adventure',
    category: 'popular',
    description: 'Peter Parker ve arkadaşları Avrupa tatilindeyken, Nick Fury ondan gizemli yaratıklar hakkında yardım ister.',
    rating: 8.5,
    duration: '2h 9m',
    type: 'movie'
  },
  {
    id: '2',
    title: 'The Dark Knight',
    poster: 'https://images.pexels.com/photos/7991492/pexels-photo-7991492.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '2008',
    genre: 'Action, Drama',
    category: 'trending',
    description: 'Batman, Joker adlı psikopat suçluyla karşı karşıya gelir.',
    rating: 9.0,
    duration: '2h 32m',
    type: 'movie'
  },
  {
    id: '3',
    title: 'Avengers: Endgame',
    poster: 'https://images.pexels.com/photos/7991528/pexels-photo-7991528.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '2019',
    genre: 'Action, Adventure',
    category: 'new',
    description: 'Avengers, Thanos ile son mücadeleye hazırlanır.',
    rating: 8.8,
    duration: '3h 1m',
    type: 'movie'
  },
  {
    id: '4',
    title: 'Inception',
    poster: 'https://images.pexels.com/photos/7991600/pexels-photo-7991600.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '2010',
    genre: 'Sci-Fi, Thriller',
    category: 'popular',
    description: 'Dom Cobb, rüyaların içinde çalışan yetenekli bir hırsızdır.',
    rating: 8.7,
    duration: '2h 28m',
    type: 'movie'
  },
  {
    id: '5',
    title: 'Stranger Things',
    poster: 'https://images.pexels.com/photos/7991650/pexels-photo-7991650.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '2016',
    genre: 'Sci-Fi, Drama',
    category: 'trending',
    description: 'Küçük bir kasabada gizemli olaylar yaşanır.',
    rating: 8.9,
    duration: '4 Sezon',
    type: 'series'
  },
  {
    id: '6',
    title: 'The Matrix',
    poster: 'https://images.pexels.com/photos/7991478/pexels-photo-7991478.jpeg?auto=compress&cs=tinysrgb&w=400',
    year: '1999',
    genre: 'Sci-Fi, Action',
    category: 'new',
    description: 'Neo, gerçekliğin bir illüzyon olduğunu keşfeder.',
    rating: 8.6,
    duration: '2h 16m',
    type: 'movie'
  }
];

const MovieCard: React.FC<{ movie: Movie; onPlay: (movie: Movie) => void }> = ({ movie, onPlay }) => (
  <div className="group relative bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer">
    <div className="relative">
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2 text-white text-sm mb-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span>{movie.rating}</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>{movie.duration}</span>
        </div>
        <button
          onClick={() => onPlay(movie)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
        >
          <Play className="w-4 h-4" />
          Oynat
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors">
        {movie.title}
      </h3>
      <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
        <Calendar className="w-4 h-4" />
        <span>{movie.year}</span>
        <span className="mx-2">•</span>
        <span>{movie.genre}</span>
      </div>
      <p className="text-gray-300 text-sm line-clamp-2">{movie.description}</p>
      {movie.videoFile && (
        <div className="mt-2">
          <span className="inline-flex items-center gap-1 text-green-400 text-xs">
            <Play className="w-3 h-3" />
            Video yüklendi
          </span>
        </div>
      )}
    </div>
  </div>
);

const AdminPanel: React.FC<{
  admin: AdminState;
  setAdmin: (admin: AdminState) => void;
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
}> = ({ admin, setAdmin, movies, setMovies }) => {
  const [formData, setFormData] = useState<Omit<Movie, 'id'>>({
    title: '',
    poster: '',
    year: '',
    genre: '',
    category: 'popular',
    description: '',
    videoFile: undefined,
    rating: 0,
    duration: '',
    type: 'movie'
  });

  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (admin.editingMovie) {
      setFormData(admin.editingMovie);
    } else {
      setFormData({
        title: '',
        poster: '',
        year: '',
        genre: '',
        category: 'popular',
        description: '',
        videoFile: undefined,
        rating: 0,
        duration: '',
        type: 'movie'
      });
    }
  }, [admin.editingMovie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (admin.currentView === 'edit' && admin.editingMovie) {
      setMovies(movies.map(movie => 
        movie.id === admin.editingMovie!.id 
          ? { ...formData, id: admin.editingMovie!.id }
          : movie
      ));
    } else {
      const newMovie: Movie = {
        ...formData,
        id: Date.now().toString()
      };
      setMovies([...movies, newMovie]);
    }
    setAdmin({ ...admin, currentView: 'list' });
  };

  const handleDelete = (id: string) => {
    setMovies(movies.filter(movie => movie.id !== id));
  };

  const handleFileUpload = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      const videoUrl = URL.createObjectURL(file);
      setFormData({ ...formData, videoFile: file, videoUrl });
    } else {
      alert('Lütfen geçerli bir video dosyası seçin (.mp4, .avi, .mkv, .mov)');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  if (!admin.isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
            <button
              onClick={() => setAdmin({ ...admin, isVisible: false })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {admin.currentView === 'list' ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white">Film & Dizi Listesi</h3>
                <button
                  onClick={() => setAdmin({ ...admin, currentView: 'add' })}
                  className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-red-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Yeni Ekle
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {movies.map(movie => (
                  <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
                    <img src={movie.poster} alt={movie.title} className="w-full h-32 object-cover rounded mb-3" />
                    <h4 className="tex