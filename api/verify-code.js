// ============================================
// Neural Overflow — パスコード検証API
// Vercelの /api/verify-code.js として配置
// ============================================

// 有効なパスコードのリスト（JOJOが管理）
// BOOTHで売るたびにここに追加する
// 形式: 'コード': 'プラン名'
const VALID_CODES = {
  // ===== ライトプラン（生成1回＋修正2回） =====
  'NRL-A1B2-C3D4': 'light',
  'NRL-E5F6-G7H8': 'light',
  'NRL-J9K0-L1M2': 'light',

  // ===== スタンダードプラン（生成2回＋修正5回） =====
  'NRL-STD1-0001': 'standard',
  'NRL-STD2-0002': 'standard',

  // ===== 作り放題プラン =====
  'NRL-PRO1-0001': 'unlimited',

  // ===== テスト用（開発中のみ・公開前に消す） =====
  'TEST-FREE-PASS': 'unlimited',
};

export default function handler(req, res) {
  // CORS設定
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code } = req.body || {};

  if (!code) {
    return res.status(400).json({ valid: false, error: 'コードがありません' });
  }

  const normalizedCode = code.trim().toUpperCase();
  const plan = VALID_CODES[normalizedCode];

  if (plan) {
    return res.status(200).json({ valid: true, plan: plan });
  } else {
    return res.status(200).json({ valid: false });
  }
}
