#!/usr/bin/env python3
"""Generate public/Rishabh_Kharbanda.pdf from the latest resume content."""

from pathlib import Path

from fpdf import FPDF

OUTPUT = Path(__file__).resolve().parents[1] / 'public' / 'Rishabh_Kharbanda.pdf'
FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
FONT_BOLD = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'


class ResumePDF(FPDF):
    def header_section(self, title: str) -> None:
        self.set_font('Resume', 'B', 11)
        self.set_text_color(60, 80, 50)
        self.cell(0, 7, title, new_x='LMARGIN', new_y='NEXT')
        self.set_text_color(0, 0, 0)
        self.ln(1)

    def body_text(self, text: str, size: int = 10) -> None:
        self.set_font('Resume', '', size)
        self.multi_cell(0, 5, text)
        self.ln(1)

    def bullet(self, text: str) -> None:
        self.set_font('Resume', '', 9.5)
        self.multi_cell(0, 4.8, f'  • {text}')
        self.ln(0.5)


def build() -> None:
    pdf = ResumePDF('P', 'mm', 'A4')
    pdf.set_auto_page_break(auto=True, margin=14)
    pdf.add_font('Resume', '', FONT)
    pdf.add_font('Resume', 'B', FONT_BOLD)
    pdf.add_page()

    pdf.set_font('Resume', 'B', 18)
    pdf.cell(0, 10, 'Rishabh Kharbanda', new_x='LMARGIN', new_y='NEXT')
    pdf.set_font('Resume', '', 9)
    pdf.cell(
        0,
        5,
        '+91 8604726050  |  rishabhkharbanda08@gmail.com  |  LinkedIn  |  Portfolio',
        new_x='LMARGIN',
        new_y='NEXT',
    )
    pdf.ln(4)

    pdf.header_section('PROFESSIONAL SUMMARY')
    pdf.body_text(
        'Senior Marketing Analyst with 5+ years of experience driving growth across gaming, fantasy sports, '
        'e-commerce, and B2C markets. Specialises in performance marketing, lifecycle analytics, and paid media '
        'optimisation — with a track record of reducing CAC by 17%, cutting ad spend by 55% while sustaining '
        'results, and delivering 70% MoM e-commerce growth. Deep expertise in cohort analysis, attribution '
        'modeling, retention marketing, and user segmentation. Experienced across international markets '
        '(Malaysia, Australia, Papua New Guinea) and experienced in Tableau, Power BI, Python, SQL, AppsFlyer, '
        'Clevertap, and WebEngage. Leverages AI tools daily for faster insight generation, campaign ideation, '
        'and data summarisation.'
    )

    pdf.header_section('EXPERIENCE')

    roles = [
        (
            'Senior Marketing Analyst  |  Yong Yuan Casino  |  Malaysia, Australia & Papua New Guinea  |  Oct 2025 – May 2026',
            [
                'Built 8+ Tableau dashboards tracking CAC, ROI, ROAS, and paid media KPIs across three markets (Malaysia, Australia, Papua New Guinea), reducing reporting turnaround by 40%.',
                'Optimised bidding strategies, audience segmentation, and ad creatives across paid media channels, lifting conversion rates by 18% and lowering Cost per Lead (CPL) through attribution modeling.',
                'Redesigned 10+ landing pages through user journey analysis and UX improvements, cutting funnel drop-offs and increasing campaign sign-ups by 25%.',
                'Drove lifecycle marketing strategy using cohort analysis and user segmentation to identify retention windows and build personalised re-engagement flows.',
                'Designed wireframes and UX flows in Figma for 3+ government digital platforms, collaborating closely with developers to deliver accessible, user-centric experiences.',
            ],
        ),
        (
            'Senior Marketing Analyst  |  Head Digital Works (Gaming & Fantasy Sports)  |  Hyderabad, India  |  Sep 2024 – Sep 2025',
            [
                'Optimised performance marketing across channels using geo-segmentation and player value tiers (HVP, MVP), reducing CAC by 17% through strategic paid media reallocation and creative testing.',
                'Restructured performance strategy and budget allocation, delivering stronger results on ₹1.8 Cr/month vs a prior spend of ₹4 Cr — a 55% cost reduction with no drop in outcomes.',
                'Conducted D0–D30 cohort analysis to map churn patterns; deployed targeted onboarding journeys via WebEngage with AppsFlyer MMP tracking, reducing new user churn by 15%.',
                'Ran detailed competitor benchmarking and market research, identifying product feature gaps that directly informed roadmap decisions and expanded share of market (SOM).',
                'Executed offline acquisition events (poker tournaments at IITs, IIMs, and Goa casinos), generating early-stage user loyalty and brand recognition in a competitive market.',
            ],
        ),
        (
            'Data Analyst  |  KSKT Agromart  |  Gurugram, India  |  Dec 2023 – Aug 2024',
            [
                'Led e-commerce growth strategy, scaling online sales by 70% MoM through data-driven campaign optimisation, paid media targeting, and retention marketing initiatives.',
                'Designed and deployed 3 KPI dashboards covering sales, marketing, and operations, enabling faster, evidence-based decision-making.',
                'Grew customer retention by 80% via deep user segmentation, personalised lifecycle campaigns, and post-purchase re-engagement flows.',
                'Raised Average Order Value (AOV) by 60% and improved ROAS by 20% through optimised marketing programs; used Python for data cleaning, cohort analysis, and LTV modelling.',
            ],
        ),
        (
            'Data Analyst  |  DaddyTech  |  Gurugram, India  |  Sep 2022 – Nov 2023',
            [
                'Used Tableau and Power BI to surface actionable trends from large datasets, contributing to a 22% increase in customer retention and 30% quarterly revenue growth.',
                'Developed and deployed predictive statistical models that drove an average of 100 net-new customers per day.',
                'Maintained 100% data integrity across pipelines; led cross-functional product launch coordination resulting in 20% sales uplift and 15% faster project delivery.',
            ],
        ),
        (
            'Key Account Manager  |  FabHotels  |  Gurugram, India  |  Apr 2021 – Aug 2022',
            [
                'Proactively resolved client issues, reducing escalations by 75% and complaints by 80% as single point of contact.',
                'Generated MIS reports to support efficient tracking, improving decision-making processes by 25%.',
                'Handled GST management, payments, and UTR generation; reported 200% financial growth in managed accounts.',
            ],
        ),
    ]

    for title, bullets in roles:
        pdf.set_font('Resume', 'B', 9.5)
        pdf.multi_cell(0, 5, title)
        pdf.ln(1)
        for item in bullets:
            pdf.bullet(item)
        pdf.ln(2)

    pdf.header_section('SKILLS')
    pdf.body_text(
        'Analytics & Visualisation: Tableau, Power BI, Excel, Google Analytics\n'
        'Programming & Data: Python, SQL, Snowflake\n'
        'Marketing & CRM Tools: Clevertap, WebEngage, AppsFlyer (MMP), Plotline, Figma\n'
        'Core Competencies: Performance Marketing, Funnel Optimisation, Lifecycle Marketing, Attribution Modeling, '
        'Cohort Analysis, Retention Marketing, Paid Media, CAC/ROAS Analysis, LTV, A/B Testing, User Segmentation, '
        'Dashboard Design, Competitor Research\n'
        'AI Tools: ChatGPT (GPT-4), Claude, Gemini, Perplexity AI — used for campaign copy, data summarisation, '
        'insight generation, automation prompts, and creative production',
        9,
    )

    pdf.header_section('PROJECTS')
    pdf.set_font('Resume', 'B', 9.5)
    pdf.cell(0, 5, 'Sales Performance Dashboard', new_x='LMARGIN', new_y='NEXT')
    pdf.body_text('Tools: Tableau, Python', 9)
    pdf.body_text(
        'Developed a sales performance dashboard for a retail company. Used Python for data cleaning and preprocessing, '
        'then built interactive Tableau visualisations covering total sales, growth trends, top-performing products, '
        'and regional breakdowns — enabling stakeholders to improve sales strategies.',
        9,
    )
    pdf.set_font('Resume', 'B', 9.5)
    pdf.cell(0, 5, 'Customer Segmentation Analysis', new_x='LMARGIN', new_y='NEXT')
    pdf.body_text('Tools: Python, Excel, Tableau', 9)
    pdf.body_text(
        'Built a customer segmentation model for an e-commerce platform using Python and clustering algorithms to '
        'segment users by purchasing behaviour and demographic data. Visualised segments in Tableau, providing '
        'actionable insights for targeted lifecycle marketing and personalised customer experiences.',
        9,
    )

    pdf.header_section('CERTIFICATIONS')
    pdf.bullet('Google Digital Marketing Certification')
    pdf.bullet('Udemy Python Developer Certification')

    pdf.header_section('EDUCATION')
    pdf.set_font('Resume', 'B', 9.5)
    pdf.cell(0, 5, 'Bachelor of Computer Applications (BCA)', new_x='LMARGIN', new_y='NEXT')
    pdf.body_text('North East Frontier Technical University (NEFTU)  |  2019 – 2023', 9)
    pdf.body_text('Concentrated on business analytics and data-driven decision-making.', 9)
    pdf.set_font('Resume', 'B', 9.5)
    pdf.cell(0, 5, 'Higher Secondary Certificate (Science)', new_x='LMARGIN', new_y='NEXT')
    pdf.body_text('M.G. Convent School, Lucknow  |  2017 – 2019', 9)

    pdf.header_section('LANGUAGES')
    pdf.body_text('English (Fluent)  •  Hindi (Fluent)', 9)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUTPUT))
    print(f'Wrote {OUTPUT} ({OUTPUT.stat().st_size} bytes)')


if __name__ == '__main__':
    build()
