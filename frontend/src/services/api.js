import axios from 'axios';

const API_BASE = 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getGraphData = async (caseKey = 'operation_garuda') => {
  const res = await apiClient.get(`/graph?case_key=${caseKey}`);
  return res.data;
};

export const switchDataset = async (datasetKey) => {
  const res = await apiClient.get(`/graph/switch-dataset/${datasetKey}`);
  return res.data;
};

export const getShortestPath = async (source, target) => {
  const res = await apiClient.get(`/graph/shortest-path?source=${source}&target=${target}`);
  return res.data;
};

export const getPredictedLinks = async () => {
  const res = await apiClient.get('/graph/predicted-links');
  return res.data;
};

export const getAnalyticsOverview = async () => {
  const res = await apiClient.get('/analytics/overview');
  return res.data;
};

export const getKingpins = async () => {
  const res = await apiClient.get('/analytics/kingpins');
  return res.data;
};

export const getCDRAnalytics = async () => {
  const res = await apiClient.get('/analytics/cdr');
  return res.data;
};

export const getFinancialAnalytics = async () => {
  const res = await apiClient.get('/analytics/financial');
  return res.data;
};

export const queryCopilot = async (query, caseId = 'operation_garuda') => {
  const res = await apiClient.post('/copilot/query', {
    query,
    context_case_id: caseId,
  });
  return res.data;
};

export const ingestFIR = async (firData) => {
  const res = await apiClient.post('/ingestion/fir-text', firData);
  return res.data;
};

export const getDossier = async () => {
  const res = await apiClient.get('/dossier/generate');
  return res.data;
};

export const getGeoHotspots = async () => {
  const res = await apiClient.get('/geospatial/hotspots');
  return res.data;
};
