"""
Generates public/bringing-home-guide.pdf for Pampered Feline Maine Coons.
Run from the project root: python scripts/generate-bringing-home-pdf.py
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, white, black
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether
)
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import BaseDocTemplate, PageTemplate, Frame

# ---------------------------------------------------------------------------
# Brand colors
# ---------------------------------------------------------------------------
OBSIDIAN   = HexColor("#1C1917")   # charcoal — used as dark header bg
BONE       = HexColor("#F5F1EB")   # warm off-white page bg
GOLD       = HexColor("#C9A96E")
GOLD_DARK  = HexColor("#B8860B")
BODY_TEXT  = HexColor("#2C2825")   # near-black body copy
LIGHT_RULE = HexColor("#D6CFC4")   # hairline rules
LABEL_GREY = HexColor("#7A736B")   # section labels

PAGE_W, PAGE_H = letter
MARGIN = 0.85 * inch

# ---------------------------------------------------------------------------
# Styles
# ---------------------------------------------------------------------------
def make_styles():
    styles = {}

    styles["title"] = ParagraphStyle(
        "title",
        fontName="Times-Bold",
        fontSize=26,
        leading=32,
        textColor=white,
        alignment=TA_CENTER,
        spaceAfter=6,
    )
    styles["subtitle"] = ParagraphStyle(
        "subtitle",
        fontName="Times-Roman",
        fontSize=11,
        leading=16,
        textColor=HexColor("#D6CFC4"),
        alignment=TA_CENTER,
        spaceAfter=4,
    )
    styles["header_label"] = ParagraphStyle(
        "header_label",
        fontName="Helvetica",
        fontSize=8,
        leading=10,
        textColor=GOLD,
        alignment=TA_CENTER,
        spaceBefore=0,
        spaceAfter=8,
        letterSpacing=2,
    )
    styles["section_label"] = ParagraphStyle(
        "section_label",
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=GOLD_DARK,
        spaceBefore=18,
        spaceAfter=4,
        letterSpacing=1.5,
    )
    styles["h2"] = ParagraphStyle(
        "h2",
        fontName="Times-Bold",
        fontSize=17,
        leading=22,
        textColor=OBSIDIAN,
        spaceBefore=4,
        spaceAfter=8,
    )
    styles["h3"] = ParagraphStyle(
        "h3",
        fontName="Times-Bold",
        fontSize=12,
        leading=16,
        textColor=OBSIDIAN,
        spaceBefore=10,
        spaceAfter=4,
    )
    styles["body"] = ParagraphStyle(
        "body",
        fontName="Times-Roman",
        fontSize=10.5,
        leading=16,
        textColor=BODY_TEXT,
        spaceAfter=6,
    )
    styles["body_small"] = ParagraphStyle(
        "body_small",
        fontName="Times-Roman",
        fontSize=9.5,
        leading=14,
        textColor=LABEL_GREY,
        spaceAfter=4,
    )
    styles["bullet"] = ParagraphStyle(
        "bullet",
        fontName="Times-Roman",
        fontSize=10.5,
        leading=15,
        textColor=BODY_TEXT,
        leftIndent=14,
        firstLineIndent=0,
        spaceAfter=3,
        bulletIndent=4,
        bulletFontName="Helvetica",
        bulletFontSize=8,
        bulletColor=GOLD,
    )
    styles["numbered"] = ParagraphStyle(
        "numbered",
        fontName="Times-Roman",
        fontSize=10.5,
        leading=15,
        textColor=BODY_TEXT,
        leftIndent=18,
        firstLineIndent=-18,
        spaceAfter=5,
    )
    styles["callout"] = ParagraphStyle(
        "callout",
        fontName="Times-Italic",
        fontSize=10.5,
        leading=16,
        textColor=BODY_TEXT,
        leftIndent=14,
        spaceAfter=6,
        spaceBefore=4,
        borderPadding=(6, 8, 6, 8),
    )
    styles["footer"] = ParagraphStyle(
        "footer",
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=LABEL_GREY,
        alignment=TA_CENTER,
    )
    return styles


# ---------------------------------------------------------------------------
# Page template with header stripe and footer
# ---------------------------------------------------------------------------
def header_footer(canvas, doc, styles):
    canvas.saveState()

    # Header stripe (only page 1 — full cover block handled inline)
    # Page 2+ get a slim top rule
    if doc.page > 1:
        canvas.setFillColor(OBSIDIAN)
        canvas.rect(0, PAGE_H - 28, PAGE_W, 28, fill=1, stroke=0)
        canvas.setFont("Helvetica", 7.5)
        canvas.setFillColor(GOLD)
        y_label = PAGE_H - 18
        canvas.drawCentredString(PAGE_W / 2, y_label, "PAMPERED FELINE MAINE COONS  —  NEW OWNER GUIDE")

    # Footer rule + text
    canvas.setStrokeColor(LIGHT_RULE)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 0.6 * inch, PAGE_W - MARGIN, 0.6 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(LABEL_GREY)
    canvas.drawString(MARGIN, 0.38 * inch, "pamperedfelinemainecoons.com")
    canvas.drawRightString(PAGE_W - MARGIN, 0.38 * inch, f"Page {doc.page}")

    canvas.restoreState()


# ---------------------------------------------------------------------------
# Content helpers
# ---------------------------------------------------------------------------
def rule(styles):
    return HRFlowable(
        width="100%", thickness=0.5,
        color=LIGHT_RULE, spaceAfter=8, spaceBefore=4
    )

def bullet_item(text, styles):
    return Paragraph(f"•  {text}", styles["bullet"])

def section_start(label, title, styles):
    return [
        Paragraph(label.upper(), styles["section_label"]),
        Paragraph(title, styles["h2"]),
    ]


# ---------------------------------------------------------------------------
# Cover block (first-page header)
# ---------------------------------------------------------------------------
def cover_block(styles):
    cover_data = [
        [Paragraph("PAMPERED FELINE MAINE COONS", styles["header_label"])],
        [Paragraph("Bringing Home Your New Kitten", styles["title"])],
        [Paragraph("A complete guide for new kitten owners", styles["subtitle"])],
        [Paragraph("pamperedfelinemainecoons.com  ·  pamperedfelinemainecoons@gmail.com", styles["subtitle"])],
    ]
    t = Table(cover_data, colWidths=[PAGE_W - 2 * MARGIN])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), OBSIDIAN),
        ("TOPPADDING",    (0, 0), (-1, 0),  20),
        ("BOTTOMPADDING", (0, -1), (-1, -1), 20),
        ("LEFTPADDING",   (0, 0), (-1, -1), 18),
        ("RIGHTPADDING",  (0, 0), (-1, -1), 18),
        ("LINEBELOW", (0, -1), (-1, -1), 2, GOLD),
    ]))
    return t


# ---------------------------------------------------------------------------
# Section 1: Before Pickup — Must-Have Supplies
# ---------------------------------------------------------------------------
def section_1(s):
    items = []
    items += section_start("Section 1", "Before Pickup — Must-Have Supplies", s)
    items.append(Paragraph(
        "Get these items before your kitten arrives:", s["body"]
    ))
    items.append(Paragraph("Food & Water", s["h3"]))
    for txt in [
        "Purina ONE +Plus Healthy Kitten formula (dry)",
        "High-quality wet kitten food (pate or chunks in gravy)",
        "Food storage container (airtight, for dry food)",
        "Food dishes: 2 shallow dishes for wet food",
        "Water bowls: 2 bowls (stainless steel or ceramic)",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Litter", s["h3"]))
    for txt in [
        "Extra-large litter box or Litter Robot 4 (your kitten will grow fast)",
        "Litter scoop",
        "BoxiePro Deep Clean litter (what your kitten is used to)",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Comfort & Safety", s["h3"]))
    for txt in [
        "Cat carrier (hard-sided, airline-approved if you're flying)",
        "Soft blankets and bedding",
        "Cat tree or scratching post (sisal rope, cardboard, or carpet)",
        "Toys (feather wands, balls, interactive toys)",
        "Cat brush or metal comb",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Veterinary Care", s["h3"]))
    items.append(Paragraph(
        "Research local veterinarians and schedule an appointment within 72 hours of pickup.",
        s["body"]
    ))
    items.append(Paragraph("Kitten Room", s["h3"]))
    items.append(Paragraph(
        "Prepare a quiet room where your kitten can decompress for the first few days. "
        "This room should have their carrier, food, water, litter box, and a few toys.",
        s["callout"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 2: Food & Feeding Schedule
# ---------------------------------------------------------------------------
def section_2(s):
    items = [rule(s)]
    items += section_start("Section 2", "Food & Feeding Schedule", s)
    items.append(Paragraph("What your kitten is eating", s["h3"]))
    items.append(Paragraph(
        "Your kitten has been raised on Purina ONE +Plus Healthy Kitten formula and various wet kitten foods.",
        s["body"]
    ))
    items.append(Paragraph("Why wet food matters", s["h3"]))
    items.append(Paragraph(
        "Wet food prevents urinary blockages, keeps your kitten hydrated, and provides balanced nutrition. "
        "Dry food alone is high in carbs. Leave dry food or an air-dried diet out at all times for grazing, "
        "but wet food twice daily is non-negotiable.",
        s["body"]
    ))
    items.append(Paragraph("Switching foods", s["h3"]))
    items.append(Paragraph(
        "Do not switch food abruptly. Mix increasing amounts of the new food with the old over 7-10 days "
        "to avoid vomiting or diarrhea.",
        s["body"]
    ))
    items.append(Paragraph("Feeding schedule", s["h3"]))
    for txt in [
        "Morning: Wet food",
        "Evening: Wet food",
        "All day: Kibble or air-dried diet available for grazing",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph(
        "Kittens should stay on kitten-specific food until 18 months of age.", s["body"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 3: Litter Box Setup
# ---------------------------------------------------------------------------
def section_3(s):
    items = [rule(s)]
    items += section_start("Section 3", "Litter Box Setup", s)
    items.append(Paragraph("What your kitten is used to", s["h3"]))
    items.append(Paragraph(
        "Your kitten has been using BoxiePro Deep Clean litter in both hooded and non-hooded litter boxes.",
        s["body"]
    ))
    items.append(Paragraph("Litter box tips", s["h3"]))
    for txt in [
        "Use a large litter box. Your kitten will grow into a 15-20 pound adult cat. A small box won't cut it.",
        "Scoop daily, replace litter weekly.",
        "Place the litter box in a quiet, low-traffic area.",
        "If you switch litter brands, do it gradually by mixing the new litter with BoxiePro over a week.",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Litter box rule of thumb", s["h3"]))
    items.append(Paragraph(
        "One litter box per cat, plus one extra. If you have other cats, your kitten needs "
        "their own box during the transition period.",
        s["callout"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 4: The First Few Days
# ---------------------------------------------------------------------------
def section_4(s):
    items = [rule(s)]
    items += section_start("Section 4", "The First Few Days — What to Expect", s)
    items.append(Paragraph("Transitioning stress is normal", s["h3"]))
    items.append(Paragraph(
        "Going home is the most stressful time in your kitten's life. They're leaving their "
        "mother, siblings, and everything they know. Expect:",
        s["body"]
    ))
    for txt in [
        "Sneezing or runny eyes/nose",
        "Soft stool or diarrhea",
        "Hiding or reluctance to eat",
        "Crying or calling for their mother",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph(
        "This is normal and usually resolves within a few days to two weeks. "
        "If symptoms persist or worsen, contact your vet.",
        s["body"]
    ))
    items.append(Paragraph("The quarantine room", s["h3"]))
    items.append(Paragraph(
        "For the first 3-7 days, confine your kitten to a small, quiet room (a bedroom works well). "
        "This room should have:",
        s["body"]
    ))
    for txt in [
        "Their carrier (left open as a safe hiding spot)",
        "Food and water bowls",
        "Litter box (placed away from food)",
        "A few toys",
        "Soft bedding",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Give them time", s["h3"]))
    items.append(Paragraph(
        "Your kitten will not walk in and immediately act confident. That's okay. Sit quietly "
        "in the room with them. Let them approach you. Offer treats. Talk softly. Don't force "
        "interaction. Some kittens adjust in a day. Others take a week. Be patient.",
        s["body"]
    ))
    items.append(Paragraph("Sleeping arrangements", s["h3"]))
    items.append(Paragraph(
        "Your kitten has been sleeping in our bedroom since birth. We hope you'll continue this. "
        "Maine Coons bond closely with their people and thrive when they're included in family life. "
        "Once your kitten is comfortable, let them sleep with you.",
        s["callout"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 5: Introducing to Other Pets
# ---------------------------------------------------------------------------
def section_5(s):
    items = [rule(s)]
    items += section_start("Section 5", "Introducing Your Kitten to Other Pets", s)
    items.append(Paragraph(
        "Do not throw your new kitten in with your existing cat or dog and expect them to get along. "
        "A rushed introduction can lead to fear, aggression, and long-term relationship problems.",
        s["body"]
    ))
    items.append(Paragraph("Timeline: 2-3 weeks minimum", s["h3"]))
    items.append(Paragraph("Week 1: Scent swapping", s["h3"]))
    for txt in [
        "Keep your kitten in their quarantine room.",
        "Swap bedding between your kitten and your other pets so they get used to each other's scent.",
        "Feed them on opposite sides of a closed door so they associate each other's presence with positive experiences (food).",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Week 2: Visual contact", s["h3"]))
    for txt in [
        "Crack the door open a few inches (use a door stop or baby gate).",
        "Let them see each other without physical contact.",
        "Reward calm behavior with treats.",
        "If either animal shows aggression, slow down.",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Week 3: Supervised interaction", s["h3"]))
    for txt in [
        "Allow short, supervised visits in a neutral space.",
        "Keep initial interactions to 10-15 minutes.",
        "Always supervise until you're confident they're safe together.",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Dogs and kittens", s["h3"]))
    items.append(Paragraph(
        "Never leave a kitten alone with a dog until the kitten is fully grown and you're 100% "
        "confident the dog won't hurt them. Even gentle dogs can accidentally injure a small kitten during play.",
        s["callout"]
    ))
    items.append(Paragraph("Young children", s["h3"]))
    items.append(Paragraph(
        "Even though your kitten has been socialized with children, young kids can be overwhelming "
        "during the transition. Teach children to approach the kitten calmly, speak quietly, and "
        "let the kitten come to them.",
        s["body"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 6: Health & Veterinary Care
# ---------------------------------------------------------------------------
def section_6(s):
    items = [rule(s)]
    items += section_start("Section 6", "Health & Veterinary Care", s)
    items.append(Paragraph("72-hour vet exam (required)", s["h3"]))
    items.append(Paragraph(
        "Your contract requires a veterinary exam within 72 hours of pickup (excluding Sundays "
        "and holidays). This exam:",
        s["body"]
    ))
    for txt in [
        "Confirms your kitten is healthy",
        "Activates your health guarantee",
        "Establishes a relationship with your vet",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph(
        "Bring your kitten's health records to this appointment.", s["body"]
    ))
    items.append(Paragraph("Vaccine schedule", s["h3"]))
    items.append(Paragraph("Your kitten has received before going home:", s["body"]))
    for txt in [
        "FVRCP — one dose",
        "Rabies — one dose",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Next vaccines due:", s["body"]))
    for txt in [
        "FVRCP: your vet will complete the kitten series (typically 2-3 doses total, 3-4 weeks apart)",
        "Rabies booster at 1 year",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Important vaccination rules", s["h3"]))
    rules_list = [
        ("<b>Core vaccines only:</b> FVRCP and rabies. We do not recommend the FeLV (feline leukemia) "
         "vaccine due to adverse reaction risk. Our kittens are indoor-only and our breeding cats are FeLV negative."),
        ("<b>One vaccine per visit:</b> Do not let your vet give multiple vaccines in one appointment. "
         "Space vaccines at least 3 weeks apart."),
        ("<b>Separate vaccines from surgery:</b> Schedule spay/neuter at least one week after vaccines "
         "(four weeks is better). Don't stress the immune system with surgery and vaccines at the same time."),
    ]
    for i, txt in enumerate(rules_list, 1):
        items.append(Paragraph(f"{i}.  {txt}", s["numbered"]))
    items.append(Paragraph("Spay/neuter timeline", s["h3"]))
    items.append(Paragraph(
        "Your contract requires spay or neuter by 10 months of age for both males and females.",
        s["body"]
    ))
    items.append(Paragraph(
        "Recommended schedule: 7-10 months. Do not spay or neuter before 7 months. Early alteration "
        "removes hormones during skeletal development. Maine Coons are a large breed and benefit from "
        "waiting until at least 7 months.",
        s["body"]
    ))
    items.append(Paragraph(
        "Important: Spaying or neutering before 7 months voids your health guarantee.",
        s["body_small"]
    ))
    items.append(Paragraph(
        "CFA registration papers will be provided after we receive proof of alteration from your vet.",
        s["body"]
    ))
    items.append(Paragraph("Microchip", s["h3"]))
    items.append(Paragraph(
        "Your kitten is microchipped and registered to Pampered Feline LLC as the primary contact, "
        "with you listed as secondary. This stays in place for the kitten's lifetime. If your kitten "
        "is ever lost or stolen, the microchip helps us recover them.",
        s["callout"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 7: Important Care Requirements
# ---------------------------------------------------------------------------
def section_7(s):
    items = [rule(s)]
    items += section_start("Section 7", "Important Care Requirements", s)
    items.append(Paragraph("Indoor only", s["h3"]))
    items.append(Paragraph(
        "Your kitten must be kept indoors. Supervised outdoor time in an enclosed space (catio) "
        "or on a harness is fine, but your kitten should never roam freely outdoors. Outdoor cats face:",
        s["body"]
    ))
    for txt in ["Cars", "Predators (dogs, coyotes, hawks)", "Disease (FeLV, FIV, parasites)", "Theft", "Poisoning"]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("No declawing", s["h3"]))
    items.append(Paragraph(
        "Declawing is never acceptable. It's amputation of the first knuckle of each toe and causes "
        "permanent pain and behavioral problems. Alternatives:",
        s["body"]
    ))
    for txt in ["Scratching posts (sisal rope, cardboard, carpet)", "Nail caps (Soft Claws)", "Regular nail trimming"]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph(
        "If you declaw your kitten, you must return them to us immediately with no refund. "
        "This is in your contract.",
        s["body_small"]
    ))
    items.append(Paragraph("Quality care", s["h3"]))
    items.append(Paragraph("Your kitten deserves:", s["body"]))
    for txt in [
        "Clean water changed daily",
        "High-quality food (wet and dry)",
        "A clean litter box (scooped daily)",
        "Regular vet visits",
        "Enrichment (toys, scratching posts, playtime)",
        "Companionship (Maine Coons are social and shouldn't be left alone for long periods)",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Companionship", s["h3"]))
    items.append(Paragraph(
        "Maine Coons bond closely with their people. They don't do well when left alone for more "
        "than a full day. If you work long hours, consider having another pet (cat, kitten, or dog) "
        "so your kitten has company.",
        s["callout"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 8: Toys & Enrichment
# ---------------------------------------------------------------------------
def section_8(s):
    items = [rule(s)]
    items += section_start("Section 8", "Toys & Enrichment", s)
    items.append(Paragraph("Safe toys", s["h3"]))
    for txt in [
        "Feather wands (supervise play, put away after use — kittens can swallow feathers)",
        "Balls (ping pong balls, jingle balls, foam balls)",
        "Interactive toys (puzzle feeders, treat balls)",
        "Catnip toys (some cats love catnip, others don't react until 6+ months)",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Unsafe toys", s["h3"]))
    for txt in [
        "String, yarn, ribbon, or tinsel (causes intestinal blockages if swallowed)",
        "Small objects that can be swallowed (buttons, hair ties, rubber bands)",
        "Broken toys (discard immediately)",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Scratching posts", s["h3"]))
    items.append(Paragraph(
        "Maine Coons need tall, sturdy scratching posts. Recommended materials:",
        s["body"]
    ))
    for txt in ["Sisal rope", "Cardboard scratchers", "Carpet-lined posts"]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph("Cat trees", s["h3"]))
    items.append(Paragraph(
        "Invest in a quality cat tree. Maine Coons are large cats (15-25 pounds at maturity) and "
        "cheap cat trees will collapse. Look for sturdy construction, wide reinforced platforms, "
        "and a weight capacity of 30+ pounds per platform. Brands we recommend: Kitty Mansions, Catit Senses.",
        s["body"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 9: Grooming & Maintenance
# ---------------------------------------------------------------------------
def section_9(s):
    items = [rule(s)]
    items += section_start("Section 9", "Grooming & Maintenance", s)
    entries = [
        ("Brushing",
         "Maine Coons have semi-long coats and benefit from weekly brushing. Use a soft brush "
         "or metal comb. Brush more frequently during shedding season (spring and fall)."),
        ("Nail trimming",
         "Trim your kitten's nails every 2-3 weeks. Your vet can show you how at your first appointment."),
        ("Bathing",
         "Maine Coons rarely need baths unless they get into something messy. "
         "Their coats are naturally water-resistant."),
        ("Ear cleaning",
         "Check ears weekly. If they look dirty or waxy, clean them with a vet-approved ear cleaner. "
         "If ears are red, inflamed, or smell bad, see your vet."),
    ]
    for title, body in entries:
        items.append(Paragraph(title, s["h3"]))
        items.append(Paragraph(body, s["body"]))
    return items


# ---------------------------------------------------------------------------
# Section 10: Lifetime Support & Contact
# ---------------------------------------------------------------------------
def section_10(s):
    items = [rule(s)]
    items += section_start("Section 10", "Lifetime Support & Contact", s)
    items.append(Paragraph("We're here for you", s["h3"]))
    items.append(Paragraph(
        "You have lifetime support for your kitten. If you have questions or concerns about health, "
        "behavior, feeding, litter training, socialization, or anything else, contact us at "
        "pamperedfelinemainecoons@gmail.com or use the contact form at pamperedfelinemainecoons.com.",
        s["body"]
    ))
    items.append(Paragraph("Stay in touch", s["h3"]))
    items.append(Paragraph("We ask that you send us photo updates:", s["body"]))
    for txt in [
        "Within 24 hours of arrival",
        "At 3 months after arrival",
        "At 6 months after arrival",
        "At least once per year after that",
    ]:
        items.append(bullet_item(txt, s))
    items.append(Paragraph(
        "This helps us track the health of our lines and confirm our kittens are thriving.",
        s["body_small"]
    ))
    items.append(Paragraph("Review your contract", s["h3"]))
    items.append(Paragraph(
        "For full terms and conditions, review your signed Kitten Purchase Agreement. "
        "A PDF copy is available at pamperedfelinemainecoons.com/contracts.",
        s["body"]
    ))
    items.append(Paragraph("Have more questions?", s["h3"]))
    items.append(Paragraph(
        "Check our FAQ at pamperedfelinemainecoons.com for answers to common questions about "
        "health guarantees, spay/neuter requirements, and more.",
        s["body"]
    ))
    return items


# ---------------------------------------------------------------------------
# Section 11: Resources & Recommendations
# ---------------------------------------------------------------------------
def section_11(s):
    items = [rule(s)]
    items += section_start("Section 11", "Resources & Recommendations", s)
    categories = [
        ("Food & Litter", [
            "Purina ONE +Plus Healthy Kitten formula (dry)",
            "High-quality wet kitten food (pate or chunks in gravy)",
            "BoxiePro Deep Clean litter",
        ]),
        ("Bowls", [
            "Stainless steel or ceramic (avoid plastic, which can cause chin acne)",
        ]),
        ("Toys & Enrichment", [
            "Kitty Mansions cat trees",
            "Catit Senses toys",
            "Feather wands (supervise use)",
        ]),
        ("General Kitten Care", [
            "ASPCA New Kitten Guide",
            "Cornell Feline Health Center",
        ]),
    ]
    for title, bullets in categories:
        items.append(Paragraph(title, s["h3"]))
        for b in bullets:
            items.append(bullet_item(b, s))
    return items


# ---------------------------------------------------------------------------
# Build the PDF
# ---------------------------------------------------------------------------
def build_pdf(output_path):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    s = make_styles()

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 10,
        bottomMargin=MARGIN,
        title="Bringing Home Your New Kitten",
        author="Pampered Feline Maine Coons",
        subject="New owner care guide",
    )

    story = []

    # Cover block
    story.append(cover_block(s))
    story.append(Spacer(1, 16))

    # Intro paragraph
    story.append(Paragraph(
        "Congratulations on your new family member! This guide covers everything you need to know "
        "to prepare for your kitten's arrival and help them settle into their new home. "
        "Keep it somewhere handy — you'll reference it often in the first few weeks.",
        s["body"]
    ))

    # Sections
    for fn in [section_1, section_2, section_3, section_4, section_5, section_6,
               section_7, section_8, section_9, section_10, section_11]:
        story.extend(fn(s))

    # Final note
    story.append(rule(s))
    story.append(Spacer(1, 6))
    story.append(Paragraph(
        "Thank you for choosing Pampered Feline Maine Coons. "
        "We are honored to place one of our kittens in your home.",
        s["body"]
    ))
    story.append(Spacer(1, 4))
    story.append(Paragraph(
        "pamperedfelinemainecoons.com  ·  pamperedfelinemainecoons@gmail.com  ·  Northern Virginia",
        s["footer"]
    ))

    doc.build(
        story,
        onFirstPage=lambda c, d: header_footer(c, d, s),
        onLaterPages=lambda c, d: header_footer(c, d, s),
    )
    print(f"PDF written: {output_path}")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    output = os.path.join(project_root, "public", "bringing-home-guide.pdf")
    build_pdf(output)
