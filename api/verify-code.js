// ============================================
// Neural Overflow — パスコード検証API
// Vercelの /api/verify-code.js として配置
//
// 【コード管理方法】
// BOOTHで売るたびに、ここの VALID_CODES にコードを追加する。
// 形式: 'コード': 'プラン名'
// プラン名: 'light' / 'standard' / 'unlimited'
// ============================================

const VALID_CODES = {
  // ===== ライトプラン（980円｜生成1回＋修正2回）=====
  'NRL-H4HJ-9NNU': 'light',
  'NRL-4JC9-E6GR': 'light',
  'NRL-9121-39IH': 'light',
  'NRL-AD0R-NXY1': 'light',
  'NRL-WZPC-CKAX': 'light',

  // ===== スタンダードプラン（1,980円｜生成2回＋修正5回）=====
  'NRS-ZMIY-13LA': 'standard',
  'NRS-2CUS-WT76': 'standard',
  'NRS-X5GC-YI9J': 'standard',
  'NRS-56S1-R6YW': 'standard',
  'NRS-HJ37-2V7Z': 'standard',

  // ===== JOJO管理用マスターコード（自分用・公開しない）=====
  'NRM-2V9D-5O23': 'unlimited',
};

export default function handler(req, res) {
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
