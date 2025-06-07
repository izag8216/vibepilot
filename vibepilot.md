# VibePilot Code + Cursor + Git Worktree + tmux + GitHub Actions + GitHub Pages 開発フロー（2025年6月版 Vibe Marketing Team対応）

**本ドキュメントは、Vibe Marketing Team というデモサイトの作成を通して、Cursor, Claude Code, Claude Code GitHub Actions (Issues連携含む), Git Worktrees, tmux といったモダンなツール群を組み合わせ、AI駆動型の並列開発環境を構築することを主目的としています。デモサイトの機能自体はダミーであり、現状その完成度を追求するものではありません。**

=======================
🛠 必要ツールのインストール
=======================
npm install -g @anthropic-ai/claude-code
sudo apt install git tmux
claude login

=======================
📁 プロジェクト初期化
=======================

## 空ファイル作成
```zsh
touch index.html styles.css app.js data.txt README.md VIBE.md .gitignore .cursorrules
```

## .gitignore 設定
```zsh
echo "manuals/" >> .gitignore
echo "node_modules/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "*.log" >> .gitignore
```

### ファイル構成
- **index.html** : メインのHTMLファイル（アプリのコンセプトを伝えるLPを含む）
- **styles.css** : スタイルシート
- **app.js** : JavaScript ロジック
- **data.txt** : Vibe Marketing Team エージェントデータファイル
- **README.md** : 説明ファイル
- **VIBE.md** : 要件指示ファイル
- **.gitignore** : 無視ファイル（manuals/フォルダ除外設定済み）
- **.cursorrules** : Cursorのルールファイル

## Cursor + Sonnet4 でアプリ生成
```
UX/UXデザイン : 
全体として Minimalist, stylish, modern, professional and product level を目指す。
ユーザーストレスゼロ、魅力的で使いやすい UI/UX デザインに仕上げること。
レスポンシブ対応、light-dark mode対応。

VibePilot アプリのコンセプトとして、9つのAIエージェントが協力してユーザーのマーケティング活動を全面的にサポートするイメージを、ランディングページ(LP)で魅力的に表現すること。
LPは視覚的なコンセプト提示が主目的であり、高度な機能実装は現段階では不要。
各エージェントの特性を活かしたダッシュボードデザインも（今回はダミーで良いが）考慮すること。
```

## Gitの初期化
```zsh
git init
git remote add origin https://github.com/izag8216/vibepilot.git
```
git add .

git commit -m "feat: Initial VibePilot app release"

git branch -M main

git push -u origin main

=======================
📄 VIBE.md & README.md 作成例
=======================

## VIBE.md（要件指示）
```markdown
# VibePilot アプリ開発要件

## アプリコンセプト
VibePilot は、オーケストレーターを含む9つの専門AIエージェントがシームレスに連携し、ユーザーのビジネスにおけるマーケティング戦略立案から実行、分析、改善までを包括的にサポートすることを目指すアプリケーションです。
ユーザーは複雑なマーケティング業務から解放され、本質的なビジネス成長に集中できるようになります。
**ただし、本プロジェクトの初期段階では、このコンセプトを提示する魅力的なランディングページ（LP）を持つデモサイトの構築に留め、実際の高度なエージェント機能の実装は行いません。主目的はAI駆動開発環境の構築です。**

## 技術仕様
- HTML/CSS/JSのみ
- AIエージェントデータは data.txt に行単位で保存
- シンプルで意味のある構造
- コミットは詳細かつ要点を押さえて

## デザイン要件
- 全体的なUI/UX: Minimalist, stylish, modern, professional, product level.
- ランディングページ(LP):
    - 上記のデザイン品質を維持しつつ、9つのAIエージェントによる包括的サポートというアプリのコアコンセプトを視覚的に、かつ魅力的に伝えるデザインであること。
    - 訪問者が一目でアプリの提供価値を理解できるような構成を心がける。
    - 現段階では機能はダミーで良いため、デザインとコンセプト伝達を最優先とする。
- レスポンシブ対応
- Light/Dark mode対応
- ユーザーストレスゼロのUX
- 各マーケティングエージェントの役割が直感的にわかるUI

## AIエージェント構成 (計9名)
1.  **オーケストレーター (Orchestrator Agent)**: 全体統括、各エージェント間の連携、進捗管理、指示出し
2.  **戦略プランナー (Strategy Planner Agent)**: 市場調査、競合分析、マーケティング戦略立案、KGI/KPI設定
3.  **コンテンツクリエーター (Content Creator Agent)**: ブログ記事、SNS投稿、コピーライティング、クリエイティブ制作ディレクション
4.  **SEO/SEMスペシャリスト (SEO/SEM Specialist Agent)**: SEO戦略、キーワードリサーチ、広告キャンペーン運用
5.  **ソーシャルメディアマネージャー (Social Media Manager Agent)**: SNS運用、エンゲージメント戦略、コミュニティ管理
6.  **データアナリスト (Data Analyst Agent)**: データ収集・分析、効果測定、レポーティング、改善提案
7.  **ブランドマネージャー (Brand Manager Agent)**: ブランド戦略策定、ブランド価値向上、ガイドライン管理
8.  **カスタマーエクスペリエンス (Customer Experience Agent)**: 顧客体験設計、フィードバック収集、NPS向上施策
9.  **インフルエンサーマネージャー (Influencer Manager Agent)**: インフルエンサー選定・連携、キャンペーン管理、効果測定
```

## README.md（説明）
```markdown
# VibePilot アプリ

## 概要
**VibePilotは、9つの専門AIエージェント（オーケストレーター、戦略プランナー、コンテンツクリエーター、SEO/SEMスペシャリスト、ソーシャルメディアマネージャー、データアナリスト、ブランドマネージャー、カスタマーエクスペリエンス、インフルエンサーマネージャー）が連携し、ユーザーのビジネスにおけるマーケティング活動を全面的にサポートすることを目指すWebアプリケーションです。**

本プロジェクトでは、このコンセプトを提示する魅力的なランディングページ（LP）を持つMVPデモサイトをHTML/CSS/JSで構築します。
**現在の主目的は、AI駆動の並列開発環境（Cursor, Claude Code, Git Worktree, tmux, GitHub Actions等）を構築することであり、LPやエージェント管理画面の機能はダミーデータの表示に留め、高度なバックエンド機能は実装しません。**
ローカルの data.txt にAIエージェント情報のCRUD操作（のダミー機能）を想定します。

## AIエージェント構成
1.  **オーケストレーター (Orchestrator Agent)**: マーケティングチーム全体の司令塔。各エージェントのタスク調整、進捗監視、リソース配分、チーム全体のパフォーマンス最適化。
2.  **戦略プランナー (Strategy Planner Agent)**: 市場動向・競合を分析し、データに基づいたマーケティング戦略を策定。ターゲット顧客の特定、キャンペーン目標設定、予算配分計画。
3.  **コンテンツクリエーター (Content Creator Agent)**: 魅力的なマーケティングコンテンツ（ブログ、SNS投稿、動画、インフォグラフィック等）を企画・制作。ブランドメッセージの一貫性を担保。
4.  **SEO/SEMスペシャリスト (SEO/SEM Specialist Agent)**: Webサイトの検索エンジン最適化（SEO）と検索エンジンマーケティング（SEM）戦略を実行。オーガニック検索流入増と広告ROI最大化。
5.  **ソーシャルメディアマネージャー (Social Media Manager Agent)**: 主要SNSプラットフォームでのブランドプレゼンス構築・管理。エンゲージメント促進、フォロワー増加、ブランドロイヤルティ向上。
6.  **データアナリスト (Data Analyst Agent)**: マーケティング活動全般のデータを収集・分析。キャンペーン効果測定、顧客行動インサイト抽出、戦略改善のためのレポート作成。
7.  **ブランドマネージャー (Brand Manager Agent)**: ブランド戦略策定、ブランド価値向上、ガイドライン管理。
8.  **カスタマーエクスペリエンス (Customer Experience Agent)**: 顧客体験設計、フィードバック収集、NPS向上施策。
9.  **インフルエンサーマネージャー (Influencer Manager Agent)**: インフルエンサー選定・連携、キャンペーン管理、効果測定。

## ファイル構成
- **index.html** : メインのHTMLファイル
- **styles.css** : スタイルシート
- **app.js** : JavaScript ロジック
- **data.txt** : Vibe Marketing Team エージェントデータファイル

## 使用方法
`index.html` をブラウザで開くだけ。
```

=======================
🌿 Git Worktree 構成
=======================
# 以下のコマンドはプロジェクトルート (`/Users/apple/projects/github/vibepilot`) で実行することを想定しています。

# 各ワークツリーはプロジェクトルートの一つ上の階層 (プロジェクトルートの親ディレクトリ内) に、
# プロジェクトルートディレクトリと並列になるように作成されます。
# 例: `../vibepilot-orchestrator` は `/Users/apple/projects/github/vibepilot-orchestrator` を指します。

# メインブランチから各機能ブランチのワークツリーを作成（計9つ）
git worktree add -b feature-orchestrator ../vibepilot-orchestrator main
git worktree add -b feature-strategy ../vibepilot-strategy main
git worktree add -b feature-content ../vibepilot-content main
git worktree add -b feature-seo ../vibepilot-seo main
git worktree add -b feature-social ../vibepilot-social main
git worktree add -b feature-analytics ../vibepilot-analytics main
git worktree add -b feature-brand ../vibepilot-brand main
git worktree add -b feature-cx ../vibepilot-cx main
git worktree add -b feature-influencer ../vibepilot-influencer main

# 確認
git worktree list

=======================
🧱 tmux セッション構成
=======================

🌟🌟🌟 tmux new -s vibepilot　※ 忘れるな！
# 上記コマンドはプロジェクトルート (`/Users/apple/projects/github/vibepilot`) で実行することを推奨します。

# Ctrl+b → %（横）または "（縦）で9つのペインに分割
# 各ペインで対応するワークツリーに移動し、Claudeを起動
# ここでの `cd` コマンドは、tmuxセッションを開始したプロジェクトルート (`/Users/apple/projects/github/vibepilot`) からの
# 相対パスで指定されたワークツリーへの移動を意味します。
# 例: `cd ../vibepilot-orchestrator` は `/Users/apple/projects/github/vibepilot` から
# `/Users/apple/projects/github/vibepilot-orchestrator` へ移動することを意図しています。

# Pane 1: Orchestrator (オーケストレーター)
cd ../vibepilot-orchestrator && claude
# → /Users/apple/projects/github/vibepilot-orchestrator へ移動

# Pane 2: Strategy (戦略プランナー)
cd ../vibepilot-strategy && claude
# → /Users/apple/projects/github/vibepilot-strategy へ移動

# Pane 3: Content (コンテンツクリエーター)
cd ../vibepilot-content && claude
# → /Users/apple/projects/github/vibepilot-content へ移動

# Pane 4: SEO/SEM (SEO/SEMスペシャリスト)
cd ../vibepilot-seo && claude
# → /Users/apple/projects/github/vibepilot-seo へ移動

# Pane 5: Social (ソーシャルメディアマネージャー)
cd ../vibepilot-social && claude
# → /Users/apple/projects/github/vibepilot-social へ移動

# Pane 6: Analytics (データアナリスト)
cd ../vibepilot-analytics && claude
# → /Users/apple/projects/github/vibepilot-analytics へ移動

# Pane 7: Brand (ブランドマネージャー)
cd ../vibepilot-brand && claude
# → /Users/apple/projects/github/vibepilot-brand へ移動

# Pane 8: CX (カスタマーエクスペリエンス)
cd ../vibepilot-cx && claude
# → /Users/apple/projects/github/vibepilot-cx へ移動

# Pane 9: Influencer (インフルエンサーマネージャー)
cd ../vibepilot-influencer && claude
# → /Users/apple/projects/github/vibepilot-influencer へ移動

=======================
🎯 各エージェントの開発タスク
=======================

## 1. Orchestrator Agent (オーケストレーター)
**担当**: 全体統括、各エージェント間の連携、進捗管理、指示出し
**開発内容**:
- メインダッシュボード画面の設計・実装
- 各エージェントの状態監視UI
- タスク配分・進捗管理機能
- エージェント間通信インターフェース

## 2. Strategy Planner Agent (戦略プランナー)
**担当**: 市場調査、競合分析、マーケティング戦略立案、KGI/KPI設定
**開発内容**:
- 戦略立案フォーム・ウィザード
- 市場分析データ表示画面
- KPI設定・追跡ダッシュボード
- 競合分析レポート機能

## 3. Content Creator Agent (コンテンツクリエーター)
**担当**: ブログ記事、SNS投稿、コピーライティング、クリエイティブ制作ディレクション
**開発内容**:
- コンテンツ作成エディター
- コンテンツライブラリ管理
- ブランドガイドライン準拠チェック
- コンテンツカレンダー機能

## 4. SEO/SEM Specialist Agent (SEO/SEMスペシャリスト)
**担当**: SEO戦略、キーワードリサーチ、広告キャンペーン運用
**開発内容**:
- キーワード分析ツール
- SEOスコア監視ダッシュボード
- 広告キャンペーン管理画面
- 検索順位追跡機能

## 5. Social Media Manager Agent (ソーシャルメディアマネージャー)
**担当**: SNS運用、エンゲージメント戦略、コミュニティ管理
**開発内容**:
- SNS投稿スケジューラー
- エンゲージメント分析画面
- ソーシャルリスニング機能
- コミュニティ管理ツール

## 6. Data Analyst Agent (データアナリスト)
**担当**: データ収集・分析、効果測定、レポーティング、改善提案
**開発内容**:
- データ可視化ダッシュボード
- レポート自動生成機能
- A/Bテスト管理画面
- 予測分析ツール

## 7. Brand Manager Agent (ブランドマネージャー)
**担当**: ブランド戦略策定、ブランド価値向上、ガイドライン管理
**開発内容**:
- ブランドガイドライン管理システム
- ブランド認知度測定ツール
- ブランド一貫性チェック機能
- ブランド価値評価ダッシュボード

## 8. Customer Experience Agent (カスタマーエクスペリエンス)
**担当**: 顧客体験設計、フィードバック収集、NPS向上施策
**開発内容**:
- カスタマージャーニーマップ作成ツール
- フィードバック収集・分析システム
- NPS測定・改善提案機能
- 顧客満足度ダッシュボード

## 9. Influencer Manager Agent (インフルエンサーマネージャー)
**担当**: インフルエンサー選定・連携、キャンペーン管理、効果測定
**開発内容**:
- インフルエンサーデータベース
- キャンペーン管理システム
- ROI測定・分析ツール
- インフルエンサー関係管理機能

=======================
🚀 GitHub Actions 設定
=======================

## .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

## Issues連携自動化
```yaml
name: Auto Issue Management

on:
  issues:
    types: [opened, closed]
  pull_request:
    types: [opened, closed, merged]

jobs:
  manage-issues:
    runs-on: ubuntu-latest
    steps:
    - name: Auto assign to project
      uses: alex-page/github-project-automation-plus@v0.8.1
      with:
        project: VibePilot Development
        column: In Progress
        repo-token: ${{ secrets.GITHUB_TOKEN }}
```

=======================
📋 開発フロー
=======================

## 1. 初期セットアップ
```zsh
# プロジェクトルートで実行
cd /Users/apple/projects/github/vibepilot

# Git Worktreeセットアップ
git worktree add -b feature-orchestrator ../vibepilot-orchestrator main
git worktree add -b feature-strategy ../vibepilot-strategy main
git worktree add -b feature-content ../vibepilot-content main
git worktree add -b feature-seo ../vibepilot-seo main
git worktree add -b feature-social ../vibepilot-social main
git worktree add -b feature-analytics ../vibepilot-analytics main
git worktree add -b feature-brand ../vibepilot-brand main
git worktree add -b feature-cx ../vibepilot-cx main
git worktree add -b feature-influencer ../vibepilot-influencer main

# tmuxセッション開始
tmux new -s vibepilot
```

## 2. 並列開発開始
```zsh
# 各ペインで対応するワークツリーに移動してClaude起動
# Pane 1: cd ../vibepilot-orchestrator && claude
# Pane 2: cd ../vibepilot-strategy && claude
# Pane 3: cd ../vibepilot-content && claude
# Pane 4: cd ../vibepilot-seo && claude
# Pane 5: cd ../vibepilot-social && claude
# Pane 6: cd ../vibepilot-analytics && claude
# Pane 7: cd ../vibepilot-brand && claude
# Pane 8: cd ../vibepilot-cx && claude
# Pane 9: cd ../vibepilot-influencer && claude
```

## 3. 開発・テスト・マージサイクル
```zsh
# 各ブランチで開発
git add .
git commit -m "feat: implement [feature-name] functionality"
git push origin feature-[name]

# メインブランチにマージ
git checkout main
git merge feature-[name]
git push origin main
```

## 4. デプロイ
GitHub Actionsが自動的にGitHub Pagesにデプロイ

=======================
🎨 UI/UX デザインガイドライン
=======================

## デザインシステム
- **カラーパレット**: 
  - Primary: #2563eb (Blue)
  - Secondary: #7c3aed (Purple)
  - Accent: #06b6d4 (Cyan)
  - Success: #10b981 (Green)
  - Warning: #f59e0b (Amber)
  - Error: #ef4444 (Red)
  - Neutral: #6b7280 (Gray)

- **タイポグラフィ**: 
  - Heading: Inter, system-ui, sans-serif
  - Body: Inter, system-ui, sans-serif
  - Code: 'Fira Code', monospace

- **スペーシング**: 8px基準のスペーシングシステム
- **ボーダーラディウス**: 8px, 12px, 16px
- **シャドウ**: Subtle elevation with consistent shadow system

## レスポンシブブレークポイント
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## ダークモード対応
- システム設定に従う自動切り替え
- 手動切り替えトグル
- 適切なコントラスト比の維持

=======================
📊 プロジェクト管理
=======================

## マイルストーン
1. **Phase 1**: 基本LP構築 (Week 1-2)
2. **Phase 2**: 9エージェント個別機能実装 (Week 3-6)
3. **Phase 3**: エージェント間連携機能 (Week 7-8)
4. **Phase 4**: 最適化・テスト・デプロイ (Week 9-10)

## KPI
- **開発効率**: 各エージェント機能の実装速度
- **コード品質**: ESLint/Prettier準拠率
- **UI/UX**: ユーザビリティテストスコア
- **パフォーマンス**: Lighthouse スコア 90+

=======================
🔧 トラブルシューティング
=======================

## よくある問題と解決策

### Git Worktree関連
```zsh
# ワークツリーが作成できない場合
git worktree prune
git worktree add -f -b feature-name ../path

# ワークツリーの削除
git worktree remove ../path
git branch -D feature-name
```

### tmux関連
```zsh
# セッションが見つからない場合
tmux list-sessions
tmux attach-session -t vibepilot

# ペインの操作
Ctrl+b → % (横分割)
Ctrl+b → " (縦分割)
Ctrl+b → 矢印キー (ペイン移動)
```

### Claude Code関連
```zsh
# 認証エラーの場合
claude logout
claude login

# プロジェクト設定の確認
claude config list
```

=======================
📚 参考資料
=======================

- [Git Worktree Documentation](https://git-scm.com/docs/git-worktree)
- [tmux Manual](https://man.openbsd.org/tmux)
- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Cursor Documentation](https://docs.cursor.sh/)

=======================
🎯 次のステップ
=======================

1. **環境構築**: 上記手順に従ってWorktree + tmux環境を構築
2. **LP作成**: VibePilotのコンセプトを伝える魅力的なランディングページを作成
3. **エージェント機能**: 9つのエージェントの個別機能を並列開発
4. **統合テスト**: エージェント間の連携機能をテスト
5. **最適化**: パフォーマンス・UX・SEOの最適化
6. **デプロイ**: GitHub Pagesへの自動デプロイ設定

---

**このドキュメントは、VibePilotプロジェクトの開発環境構築と並列開発フローの完全ガイドです。各エージェントチームは、このガイドに従って効率的な開発を進めてください。** 