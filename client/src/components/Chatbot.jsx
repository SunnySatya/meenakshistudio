import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";

const KNOWLEDGE = [
  {
    keywords: [
      "price",
      "pricing",
      "package",
      "cost",
      "rate",
      "charge",
      "kitna",
      "daam",
    ],
    answer:
      "Humare packages:\n\nSilver — ₹50,000 (advance ₹6000)\nGold — ₹80,000 (advance ₹10,000)\nPlatinum — ₹130,000 (advance ₹18,000)\n\nHar package ka advance alag hai.Ye Package full shadi ka prices hn, Agar Aap Haldi, Mehandi, Birthday,Reel Ya dusre kisi event ka charge janana chahte ho to Hame Whatsapp pe contact kar sakate ho, Booking form me aapko wedding ke exact advance dikh jayega. Full details ke liye Packages section check karein!",
  },
  {
    keywords: ["advance", "booking amount", "confirm", "pay", "payment"],
    answer:
      "Booking confirm karne ke liye advance dena hota hai. Silver ka advance ₹6000, Gold ka ₹10,000 aur Platinum ka ₹18,000 hai. Small Party ya Other package ke liye sirf ₹1,000 advance hai. Baaki amount shoot ke din pay karte hain. Payment online (Razorpay) se hoti hai.",
  },
  {
    keywords: ["book", "booking", "session", "slot", "reserve"],
    answer:
      "Aap 'Book a Session' form bhar kar booking kar sakte hain — website ke Booking section me jaayein aur form fill karein. Booking confirm karne ke liye thoda advance pay karna hota hai. Koi doubt ho to WhatsApp par bhi message kar sakte hain!",
  },
  {
    keywords: ["silver"],
    answer:
      "Silver package — ₹50,000. Isme Full Wedding, Traditional Shoot, Drone Shoot, 4K Video, 200+ Photos Album aur 3 Photographers shamil hain. Advance sirf ₹5000 hai!",
  },
  {
    keywords: ["gold"],
    answer:
      "Gold package — ₹80,000 (Most Popular). Isme Full Wedding, Traditional Shoot, Drone Shoot, 4K Video, 300+ Photos Album, 5 Photographers, Haldi, Mehendi, Ring Ceremony, Candid/Cinematic Shoot, Wall Led aur Gallery Frames shamil hain. Advance ₹10,000 hai.",
  },
  {
    keywords: ["platinum"],
    answer:
      "Platinum package — ₹130,000. Ye hamara premium package hai! Isme sab kuch shamil hai: 350+ Photos Album, 7 Photographers, Haldi, Mehendi, Ring Ceremony, Candid, Cinematic, Luxury Photo Album, Instant Reels, Crane Shots, Pre-Wedding Shoot, Story Shoot aur bhi bahut kuch. Advance ₹18,000 hai.",
  },
  {
    keywords: ["contact", "phone", "number", "call", "email", "mail", "reach"],
    answer:
      "Aap humse is tarah contact kar sakte hain:\n\nEmail: sunnysatya4@gmail.com\nPhone/WhatsApp: +91 6398665027\n\nHum sirf online work lete hain, help address Etah, UP hai.",
  },
  {
    keywords: ["location", "address", "where", "studio", "based", "kahan"],
    answer:
      "Humara studio Etah, UP mein hai. Hum sirf online work lete hain — aap kahin se bhi booking kar sakte hain, hum aapke event par shoot ke liye time pe aate hain.",
  },
  {
    keywords: ["who", "about", "photographer", "owner", "who is"],
    answer:
      "Yeh hai Royal Photography — ek professional photography studio. Jo apke shahar ka best studio he ye Quality pe focus krta hai.Wedding, Pre-Wedding, Portrait, Fashion, Birthday, Corporate, Maternity aur bhi bahut si categories mein kaam karte hain. Portfolio section mein humara kaam dekhein!",
  },
  {
    keywords: [
      "portfolio",
      "work",
      "gallery",
      "photos",
      "sample",
      "album",
      "example",
    ],
    answer:
      "Aap humara kaam Portfolio section mein dekh sakte hain — weddings, haldi, mehendi, ring ceremony, events aur portraits ki real shoots. Home page par scroll karke portfolio check karein!",
  },
  {
    keywords: ["wedding", "shaadi"],
    answer:
      "Wedding shoot ke liye hamare paas Silver (₹50,000), Gold (₹80,000) aur Platinum (₹130,000) packages hain. Har package mein photos, video aur photographers shamil hain. Booking section mein form bhar kar book karein!",
  },
  {
    keywords: ["pre wedding", "pre-wedding", "engagement", "ring"],
    answer:
      "Pre-Wedding aur Ring Ceremony shoots ke liye bhi packages available hain. Aap apni requirement booking form mein bata sakte hain ya WhatsApp par message karein — hum custom quote bhi de sakte hain.",
  },
  {
    keywords: ["birthday", "party", "small party", "event"],
    answer:
      "Birthday aur Small Party events ke liye advance sirf ₹1,000 hai. Booking form mein 'Small Party' ya 'Birthday' event type select karein agar ye option na aaye to other chun lein aur book kar lein!",
  },
  {
    keywords: ["reel", "reels", "reel shoot", "instatnt reel"],
    answer:
      "Ha ham aapko reel shoot krke bhi dete hn, agar aap silver se upr ka package chunte hn to to ye usi me add hua hota he iske liye alag se koi charge nhi he, agar aap alag se kisi bhi tarah ka reel shoot karbana chahte hn to ham bo bhi shoot karate hn, price ke liye aap hame whatsapp pe contact kar sakate hen!",
  },

  {
    keywords: ["discount", "offer", "deal", "off"],
    answer:
      "Kabhi-kabhi festive offers aate hain. Current offers ke liye WhatsApp par message karein ya booking form bhar dein — hum aapko best quote denge!",
  },
  {
    keywords: [
      "delivery",
      "photos deliver",
      "time",
      "when",
      "how long",
      "kitne din",
      "album kitne dino me bana ke dete ho",
    ],
    answer:
      "Shoot ke baad photos ki editing hone mein aam taur par 2-4 hafte lagte hain. Album aur gallery phle aapko online deliver hoti hai. Apke confirmation ke bad album book banane me 40 se 50 din lagate hain. Delivery time ke baare mein booking ke waqt confirm kar liya jaata hai.",
  },
  {
    keywords: [
      "quality",
      "album quality",
      "photo quality ",
      "video quality",
      "reel quality",
      "4k 8k",
    ],
    answer:
      "HaHa Royal Photography Quality ke liye hi jana Jata hai, Etah ka Top Quality Provider studi, Aap Hamen Book Karte hn To Quality Ki Fikra Nahi Kijiye Kyuki Quality Matalab Royal Photography",
  },
  {
    keywords: ["kya", "shoot ", "what", "karate ho"],
    answer:
      "Ham sab tarah ka shoot karte hn, client ki jo bhi demand hoti he use bahut achhe se quality me kiya jata hai ",
  },
  {
    keywords: ["insta", "instagram ", "instagramid "],
    answer:
      "Ha, Royal photography Ka ek Instagram account bhi he jispe hajaro me views aate hn or aap Hamare sath collab bhi kar skte hn, Hamara instagram account he = royalphotography_14",
  },
  {
    keywords: [
      "hi",
      "hello",
      "hey",
      "namaste",
      "namaskar",
      "good morning",
      "good evening",
    ],
    answer:
      "Namaste! Royal Photography mein aapka swagat hai. Royal Photgraphy apke shahar ka best photography studio hai, jo sabhi tarah ki video/photography provide karata hai! Main aapki madad ke liye hoon. Aap pooch sakte hain:\n\n• Packages & pricing\n• Advance payment\n• Booking process\n• Contact details\n\nKya poochna chahenge?",
  },
  {
    keywords: ["thanks", "thank you", "shukriya", "dhanyavad"],
    answer:
      "Aapka swagat hai! 😊 Koi aur sawaal ho to zaroor poochiye. Booking ke liye form bhar dein ya WhatsApp par message karein!",
  },
  {
    keywords: ["cinematic"],
    answer:
      "Ha ham har program ko cinematic shoot krte hn agr aap demand krte hn to, Har shoot ka alag alag Price he,Iske liye Aap pricing section check kr skte hn ya aap whatsapp pe contact krke puchch skte hn",
  },
];

const QUICK_REPLIES = [
  "Packages & price",
  "Advance kitna hai?",
  "Booking kaise karein?",
  "Contact details",
  "Cinematic",
];

const DEFAULT_ANSWER =
  "Sorry, maine ye sawaal abhi tak seekha nahi hai. 😅 Aap WhatsApp +91 6398665027 par message kar sakte hain ya booking form bhar dein — hum jaldi reply karenge! Kuch common questions:\n\n• Packages & pricing\n• Advance payment\n• Booking process\n• Contact details";

const matchAnswer = (input) => {
  const text = input.toLowerCase().trim();
  let best = null;
  let bestScore = 0;
  for (const entry of KNOWLEDGE) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best ? best.answer : DEFAULT_ANSWER;
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Namaste! 🙏 Main Royal Photography ka assistant hoon. Packages, advance, booking ya kisi bhi sawaal ke liye pooch sakte hain!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, typing, open]);

  const sendMessage = (text) => {
    const value = (text ?? input).trim();
    if (!value) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: value }]);
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: matchAnswer(value) },
      ]);
      setTyping(false);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <button
        type="button"
        className="chatbot-float"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        title="Chat with us"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <Bot size={20} />
            </div>
            <div>
              <h4>Royal Photography Assistant</h4>
              <span className="chatbot-status">
                <span className="status-dot" /> Online — typically replies
                instantly
              </span>
            </div>
            <button
              type="button"
              className="chatbot-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                {m.text.split("\n").map((line, j) => (
                  <p key={j}>{line}</p>
                ))}
              </div>
            ))}
            {typing && (
              <div className="chat-msg bot typing">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
              </div>
            )}
          </div>

          <div className="chatbot-quick">
            {QUICK_REPLIES.map((q) => (
              <button key={q} type="button" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question..."
            />
            <button
              type="button"
              onClick={() => sendMessage()}
              aria-label="Send"
              className="chatbot-send"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
