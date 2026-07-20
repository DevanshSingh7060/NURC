import React, { createContext, useContext, useState, useEffect } from 'react';
import { Newsletter, MOCK_NEWSLETTERS } from '../data/newslettersData';

export interface Subscriber {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  designation: string;
  companySize: string;
  industries: string[];
  frequency: 'Daily';
  theme: 'Original' | 'Executive' | 'FT' | 'Modern' | 'Corporate';
  password?: string;
  plan: 'Essential' | 'Executive' | 'Enterprise' | 'None';
  renewalDate: string;
  status: 'Active' | 'Inactive' | 'Pending';
  companyWebsite?: string;
}

interface AppContextType {
  currentUser: Subscriber | null;
  newsletters: Newsletter[];
  subscribers: Subscriber[];
  savedArticles: string[]; // List of newsletter IDs
  readArticles: string[]; // List of newsletter IDs
  continueReading: string | null; // ID of last opened newsletter
  login: (email: string, password: string) => boolean;
  signup: (userData: Omit<Subscriber, 'plan' | 'renewalDate' | 'status' | 'frequency'>) => void;
  logout: () => void;
  updateProfile: (data: Partial<Pick<Subscriber, 'fullName' | 'phone'>>) => void;
  updateCompany: (
    data: Partial<Pick<Subscriber, 'companyName' | 'designation' | 'industry'>>,
  ) => void;
  updatePreferences: (industries: string[]) => void;
  updateTheme: (theme: Subscriber['theme']) => void;
  updateSubscription: (
    plan: Subscriber['plan'],
    industries: string[],
    theme: Subscriber['theme'],
    businessInfo?: Partial<Subscriber>,
  ) => void;
  toggleSaveArticle: (id: string) => void;
  markAsRead: (id: string) => void;
  setContinueReading: (id: string | null) => void;
  // Future Admin operations
  addNewsletter: (nl: Newsletter) => void;
  deleteNewsletter: (id: string) => void;
  updateSubscriberAdmin: (email: string, data: Partial<Subscriber>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// DEV/DEMO SEED ONLY — this subscriber is seeded into localStorage on first load so the
// demo login works locally. Its password comes from VITE_DEV_SEED_PASSWORD (see .env.example),
// never a hardcoded shippable value. Leave the env var unset in production.
const DEFAULT_SUBSCRIBER: Subscriber = {
  fullName: 'Devansh Sharma',
  email: 'devansh@nurcmedianext.com',
  phone: '+91-9810975257',
  companyName: 'NURC MediaNext',
  industry: 'Automotive',
  designation: 'Senior Industry Analyst',
  companySize: '500-1000',
  industries: ['Automotive', 'Banking', 'Healthcare'],
  frequency: 'Daily',
  theme: 'Original',
  password: import.meta.env.VITE_DEV_SEED_PASSWORD ?? '',
  plan: 'Executive',
  renewalDate: 'May 30, 2027',
  status: 'Active',
  companyWebsite: 'https://nurcmedianext.com',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-load database states from localStorage
  const [subscribers, setSubscribers] = useState<Subscriber[]>(() => {
    const saved = localStorage.getItem('nurc_subscribers');
    return saved ? JSON.parse(saved) : [DEFAULT_SUBSCRIBER];
  });

  const [newsletters, setNewsletters] = useState<Newsletter[]>(() => {
    const saved = localStorage.getItem('nurc_newsletters');
    return saved ? JSON.parse(saved) : MOCK_NEWSLETTERS;
  });

  const [currentUser, setCurrentUser] = useState<Subscriber | null>(() => {
    const saved = localStorage.getItem('nurc_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    const saved = localStorage.getItem('nurc_saved_articles');
    return saved ? JSON.parse(saved) : [];
  });

  const [readArticles, setReadArticles] = useState<string[]>(() => {
    const saved = localStorage.getItem('nurc_read_articles');
    return saved ? JSON.parse(saved) : [];
  });

  const [continueReading, setContinueReadingState] = useState<string | null>(() => {
    return localStorage.getItem('nurc_continue_reading');
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('nurc_subscribers', JSON.stringify(subscribers));
  }, [subscribers]);

  useEffect(() => {
    localStorage.setItem('nurc_newsletters', JSON.stringify(newsletters));
  }, [newsletters]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('nurc_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nurc_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('nurc_saved_articles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  useEffect(() => {
    localStorage.setItem('nurc_read_articles', JSON.stringify(readArticles));
  }, [readArticles]);

  useEffect(() => {
    if (continueReading) {
      localStorage.setItem('nurc_continue_reading', continueReading);
    } else {
      localStorage.removeItem('nurc_continue_reading');
    }
  }, [continueReading]);

  // Auth Operations
  const login = (email: string, password: string): boolean => {
    // Reject blank credentials — prevents matching a seed whose password is unset in production.
    if (!email || !password) return false;
    const found = subscribers.find(
      (s) => s.email.toLowerCase() === email.toLowerCase() && s.password === password,
    );
    if (found) {
      setCurrentUser(found);
      return true;
    }
    return false;
  };

  const signup = (userData: Omit<Subscriber, 'plan' | 'renewalDate' | 'status' | 'frequency'>) => {
    const newSub: Subscriber = {
      ...userData,
      frequency: 'Daily',
      plan: 'None',
      renewalDate: 'Not Subscribed',
      status: 'Pending',
    };
    setSubscribers((prev) => {
      const filtered = prev.filter((s) => s.email.toLowerCase() !== userData.email.toLowerCase());
      return [...filtered, newSub];
    });
    setCurrentUser(newSub);
  };

  const logout = () => {
    setCurrentUser(null);
    setContinueReadingState(null);
  };

  // Profile operations
  const updateProfile = (data: Partial<Pick<Subscriber, 'fullName' | 'phone'>>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setSubscribers((prev) =>
      prev.map((s) => (s.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : s)),
    );
  };

  const updateCompany = (
    data: Partial<Pick<Subscriber, 'companyName' | 'designation' | 'industry'>>,
  ) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setSubscribers((prev) =>
      prev.map((s) => (s.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : s)),
    );
  };

  const updatePreferences = (industries: string[]) => {
    if (!currentUser) return;
    const updated = { ...currentUser, industries, frequency: 'Daily' as const };
    setCurrentUser(updated);
    setSubscribers((prev) =>
      prev.map((s) => (s.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : s)),
    );
  };

  const updateTheme = (theme: Subscriber['theme']) => {
    if (!currentUser) return;
    const updated = { ...currentUser, theme };
    setCurrentUser(updated);
    setSubscribers((prev) =>
      prev.map((s) => (s.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : s)),
    );
  };

  const updateSubscription = (
    plan: Subscriber['plan'],
    industries: string[],
    theme: Subscriber['theme'],
    businessInfo?: Partial<Subscriber>,
  ) => {
    if (!currentUser) return;
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
    const renewalString = oneYearFromNow.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    const updated: Subscriber = {
      ...currentUser,
      plan,
      industries,
      theme,
      renewalDate: renewalString,
      status: 'Active',
      frequency: 'Daily',
      ...businessInfo,
    };
    setCurrentUser(updated);
    setSubscribers((prev) =>
      prev.map((s) => (s.email.toLowerCase() === currentUser.email.toLowerCase() ? updated : s)),
    );
  };

  // Interactions
  const toggleSaveArticle = (id: string) => {
    setSavedArticles((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const markAsRead = (id: string) => {
    setReadArticles((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const setContinueReading = (id: string | null) => {
    setContinueReadingState(id);
  };

  // Admin capabilities
  const addNewsletter = (nl: Newsletter) => {
    setNewsletters((prev) => [nl, ...prev]);
  };

  const deleteNewsletter = (id: string) => {
    setNewsletters((prev) => prev.filter((nl) => nl.id !== id));
  };

  const updateSubscriberAdmin = (email: string, data: Partial<Subscriber>) => {
    setSubscribers((prev) =>
      prev.map((s) => {
        if (s.email.toLowerCase() === email.toLowerCase()) {
          const updated = { ...s, ...data };
          if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
            setCurrentUser(updated);
          }
          return updated;
        }
        return s;
      }),
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        newsletters,
        subscribers,
        savedArticles,
        readArticles,
        continueReading,
        login,
        signup,
        logout,
        updateProfile,
        updateCompany,
        updatePreferences,
        updateTheme,
        updateSubscription,
        toggleSaveArticle,
        markAsRead,
        setContinueReading,
        addNewsletter,
        deleteNewsletter,
        updateSubscriberAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
