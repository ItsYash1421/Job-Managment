'use client';

import { IconMapPin, IconBriefcase, IconCurrencyRupee } from '@tabler/icons-react';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: any;
}

const getCompanyColor = (name: string) => {
  const colors = ['#FF9900', '#00A8E1', '#5F3DC4', '#E03131', '#2B8A3E'];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getCompanyInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};

const formatTimeAgo = (date: string) => {
  const now = new Date();
  const created = new Date(date);
  const diffMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
  
  if (diffMinutes < 60) {
    return `${diffMinutes}m Ago`;
  }
  
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h Ago`;
  }
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays}d Ago`;
  }
  
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo Ago`;
};

export default function JobCard({ job }: JobCardProps) {
  const extractDescriptionPoints = (text: string, maxWords = 150, maxPoints = 3): string[] => {
    if (!text) return [];
    // Split by common bullet separators or newlines; fallback to sentences
    let parts = text
      .split(/\r?\n|•|\u2022|^-\s*|\s*-\s+/gm)
      .map((p) => p.trim())
      .filter(Boolean);

    if (parts.length === 0) {
      parts = text.split(/[.!?]+\s+/).map((p) => p.trim()).filter(Boolean);
    }

    const result: string[] = [];
    let used = 0;
    for (const p of parts) {
      const words = p.split(/\s+/).filter(Boolean);
      if (words.length === 0) continue;
      if (used + words.length > maxWords) {
        const remaining = Math.max(0, maxWords - used);
        if (remaining > 0) {
          result.push(words.slice(0, remaining).join(' ') + '…');
        }
        break;
      }
      result.push(p);
      used += words.length;
      if (result.length >= maxPoints) break;
    }
    return result;
  };

  const descriptionPoints = extractDescriptionPoints(job.jobDescription, 150, 3);

  const formatLPA = (amount: number) => {
    if (!amount && amount !== 0) return '';
    return `${Math.round(amount / 100000)}LPA`;
  };

  return (
    <div className={styles.card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div className={styles.companyLogo}>
          <span style={{ color: getCompanyColor(job.companyName), fontWeight: 'bold' }}>
            {getCompanyInitial(job.companyName)}
          </span>
        </div>
        <span className={styles.timeAgo}>{formatTimeAgo(job.createdAt)}</span>
      </div>

      <h3 className={styles.jobTitle}>{job.jobTitle}</h3>

      <div className={styles.infoContainer}>
        <div className={styles.infoRow}>
          <IconBriefcase size={16} stroke={1.5} color="#9CA3AF" />
          <span>{job.jobType}</span>
        </div>
        <div className={styles.infoRow}>
          <IconMapPin size={16} stroke={1.5} color="#9CA3AF" />
          <span>{job.location}</span>
        </div>
        <div className={styles.infoRow}>
          <IconCurrencyRupee size={16} stroke={1.5} color="#9CA3AF" />
          <span>
            {formatLPA(job.salaryRangeMin)}
            {job.salaryRangeMax ? ` - ${formatLPA(job.salaryRangeMax)}` : ''}
          </span>
        </div>
      </div>

      <div className={styles.description}>
        {descriptionPoints.map((point: string, index: number) => (
          <div key={index} className={styles.descriptionItem}>
            <span className={styles.bullet}>•</span>
            <span className={styles.descriptionText}>{point.trim()}</span>
          </div>
        ))}
      </div>

      <button className={styles.applyButton}>Apply Now</button>
    </div>
  );
}
