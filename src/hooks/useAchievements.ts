// src/hooks/useAchievements.ts

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Achievement } from '../types/achievement.type';
import Cookies from 'js-cookie';
import { asArray } from '../utils/apiResponse';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const headers = {
    Authorization: `Bearer ${Cookies.get('adminToken')}`,
  };

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/achievements`, { headers });
      setAchievements(asArray<Achievement>(response.data));
    } catch (err: any) {
      console.error('Error fetching achievements:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  return { achievements, loading, error, fetchAchievements, setAchievements };
};

export default useAchievements;
