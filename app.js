// VibePilot App JavaScript

// ===== Theme Management =====
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.setupToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateToggleIcon();
    }

    updateToggleIcon() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.textContent = this.theme === 'dark' ? '☀️' : '🌙';
        }
    }

    setupToggle() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }
}

// ===== Agent Data Manager =====
class AgentDataManager {
    constructor() {
        this.agents = [];
        this.loadAgents();
    }

    async loadAgents() {
        try {
            const response = await fetch('data.txt');
            const text = await response.text();
            this.parseAgentData(text);
            this.renderAgents();
        } catch (error) {
            console.error('Error loading agent data:', error);
            this.loadDefaultAgents();
        }
    }

    parseAgentData(text) {
        const lines = text.split('\n').filter(line => line.trim());
        this.agents = lines.map(line => {
            const [name, role, description, skills, icon, color] = line.split('|');
            return {
                name: name?.trim(),
                role: role?.trim(),
                description: description?.trim(),
                skills: skills?.trim().split(',').map(s => s.trim()),
                icon: icon?.trim(),
                color: color?.trim()
            };
        }).filter(agent => agent.name);
    }

    loadDefaultAgents() {
        this.agents = [
            {
                name: "オーケストレーター",
                role: "Orchestrator Agent",
                description: "マーケティングチーム全体の司令塔として、各エージェントのタスク調整、進捗監視、リソース配分を行い、チーム全体のパフォーマンスを最適化します。",
                skills: ["プロジェクト管理", "リソース配分", "進捗監視", "チーム調整"],
                icon: "🎯",
                color: "primary"
            },
            {
                name: "戦略プランナー",
                role: "Strategy Planner Agent",
                description: "市場動向と競合を分析し、データに基づいたマーケティング戦略を策定。ターゲット顧客の特定、キャンペーン目標設定、予算配分計画を担当します。",
                skills: ["市場分析", "競合調査", "戦略立案", "KPI設定"],
                icon: "📊",
                color: "secondary"
            },
            {
                name: "コンテンツクリエーター",
                role: "Content Creator Agent",
                description: "魅力的なマーケティングコンテンツ（ブログ、SNS投稿、動画、インフォグラフィック等）を企画・制作し、ブランドメッセージの一貫性を担保します。",
                skills: ["コンテンツ制作", "コピーライティング", "ビジュアルデザイン", "ブランディング"],
                icon: "✍️",
                color: "accent"
            },
            {
                name: "SEO/SEMスペシャリスト",
                role: "SEO/SEM Specialist Agent",
                description: "Webサイトの検索エンジン最適化（SEO）と検索エンジンマーケティング（SEM）戦略を実行し、オーガニック検索流入増と広告ROI最大化を実現します。",
                skills: ["SEO最適化", "キーワード分析", "広告運用", "アナリティクス"],
                icon: "🔍",
                color: "success"
            },
            {
                name: "ソーシャルメディアマネージャー",
                role: "Social Media Manager Agent",
                description: "主要SNSプラットフォームでのブランドプレゼンス構築・管理を行い、エンゲージメント促進、フォロワー増加、ブランドロイヤルティ向上を図ります。",
                skills: ["SNS運用", "コミュニティ管理", "エンゲージメント", "インフルエンサー連携"],
                icon: "📱",
                color: "warning"
            },
            {
                name: "データアナリスト",
                role: "Data Analyst Agent",
                description: "マーケティング活動全般のデータを収集・分析し、キャンペーン効果測定、顧客行動インサイト抽出、戦略改善のためのレポートを作成します。",
                skills: ["データ分析", "レポート作成", "予測分析", "ダッシュボード構築"],
                icon: "📈",
                color: "error"
            },
            {
                name: "ブランドマネージャー",
                role: "Brand Manager Agent",
                description: "ブランド戦略の策定とブランド価値向上を担当し、ガイドライン管理、ブランド認知度測定、一貫性のあるブランド体験を提供します。",
                skills: ["ブランド戦略", "ガイドライン管理", "ブランド測定", "体験設計"],
                icon: "🎨",
                color: "primary"
            },
            {
                name: "カスタマーエクスペリエンス",
                role: "Customer Experience Agent",
                description: "顧客体験の設計と最適化を行い、フィードバック収集、NPS向上施策、カスタマージャーニーの改善を通じて顧客満足度を向上させます。",
                skills: ["CX設計", "フィードバック分析", "NPS向上", "ジャーニーマップ"],
                icon: "💝",
                color: "secondary"
            },
            {
                name: "インフルエンサーマネージャー",
                role: "Influencer Manager Agent",
                description: "インフルエンサーの選定・連携、キャンペーン管理、効果測定を行い、ブランドとインフルエンサーの最適なパートナーシップを構築します。",
                skills: ["インフルエンサー選定", "キャンペーン管理", "ROI測定", "関係管理"],
                icon: "🌟",
                color: "accent"
            }
        ];
        this.renderAgents();
    }

    renderAgents() {
        const agentsGrid = document.getElementById('agentsGrid');
        if (!agentsGrid) return;

        agentsGrid.innerHTML = this.agents.map(agent => `
            <div class="agent-detail-card fade-in-up" data-color="${agent.color}">
                <div class="agent-header">
                    <div class="agent-avatar">
                        ${agent.icon}
                    </div>
                    <div class="agent-info">
                        <h3>${agent.name}</h3>
                        <div class="agent-role">${agent.role}</div>
                    </div>
                </div>
                <p class="agent-description">${agent.description}</p>
                <div class="agent-skills">
                    ${agent.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');

        this.animateCards();
    }

    animateCards() {
        const cards = document.querySelectorAll('.agent-detail-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease-out';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }
}

// ===== Smooth Scrolling =====
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ===== Intersection Observer for Animations =====
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe elements
        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll(`
            .feature-card,
            .pricing-card,
            .metric-card,
            .dashboard-mockup
        `);

        elements.forEach(el => {
            this.observer.observe(el);
        });
    }
}

// ===== Navbar Scroll Effect =====
class NavbarController {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                // スクロール時にシャドウのみ追加し、背景色は変更しない
                this.navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
            } else {
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// ===== Interactive Dashboard Preview =====
class DashboardPreview {
    constructor() {
        this.init();
    }

    init() {
        this.animateMetrics();
        this.animateCharts();
        this.setupInteractivity();
    }

    animateMetrics() {
        const metrics = document.querySelectorAll('.metric-value');
        metrics.forEach(metric => {
            const finalValue = metric.textContent;
            const isPercentage = finalValue.includes('%');
            const numericValue = parseFloat(finalValue.replace(/[^\d.]/g, ''));
            
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    currentValue = numericValue;
                    clearInterval(timer);
                }
                
                metric.textContent = isPercentage 
                    ? `${Math.round(currentValue)}%`
                    : Math.round(currentValue).toString();
            }, 30);
        });
    }

    animateCharts() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleY(0)';
                bar.style.transformOrigin = 'bottom';
                bar.style.transition = 'transform 0.8s ease-out';
                
                setTimeout(() => {
                    bar.style.transform = 'scaleY(1)';
                }, 100);
            }, index * 100);
        });
    }

    setupInteractivity() {
        const agentCards = document.querySelectorAll('.agent-card');
        agentCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// ===== Button Interactions =====
class ButtonController {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation CSS
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// ===== Performance Monitoring =====
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Performance:', {
                loadTime: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                totalTime: Math.round(perfData.loadEventEnd - perfData.fetchStart)
            });
        });

        // Monitor user interactions
        this.trackInteractions();
    }

    trackInteractions() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.btn, .nav-link, .agent-card')) {
                console.log('User interaction:', {
                    element: e.target.className,
                    timestamp: Date.now()
                });
            }
        });
    }
}

// ===== App Initialization =====
class VibePilotApp {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        console.log('🚀 VibePilot App Initializing...');

        // Initialize all components
        this.themeManager = new ThemeManager();
        this.agentDataManager = new AgentDataManager();
        this.smoothScroll = new SmoothScroll();
        this.animationObserver = new AnimationObserver();
        this.navbarController = new NavbarController();
        this.dashboardPreview = new DashboardPreview();
        this.buttonController = new ButtonController();
        this.performanceMonitor = new PerformanceMonitor();

        console.log('✅ VibePilot App Initialized Successfully!');
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('app-loaded');
    }
}

// ===== Start the Application =====
const app = new VibePilotApp();

// ===== Export for potential module usage =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VibePilotApp,
        ThemeManager,
        AgentDataManager
    };
}
