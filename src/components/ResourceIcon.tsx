import React from 'react';
import {
  Droplets,
  HeartPulse,
  Utensils,
  Bed,
  Flashlight,
  Wrench,
  Shield,
  Activity,
  Tent,
  Radio,
  Zap,
  Fuel,
  Package,
} from 'lucide-react';

interface ResourceIconProps {
  icon?: string;
  name?: string;
  className?: string;
}

export const ResourceIcon: React.FC<ResourceIconProps> = ({ icon = '', name = '', className }) => {
  const iconKey = icon.toLowerCase().trim();
  const nameLower = name.toLowerCase();

  // Water
  if (
    iconKey === 'water' ||
    iconKey === 'droplet' ||
    iconKey === '\u{1F4A7}' ||
    nameLower.includes('water')
  ) {
    return <Droplets className={className || 'w-4 h-4 text-sky-500'} />;
  }

  // Medicine / Medical
  if (
    iconKey === 'medicine' ||
    iconKey === 'medical' ||
    iconKey === 'pill' ||
    iconKey === '\u{1F48A}' ||
    nameLower.includes('med') ||
    nameLower.includes('first aid') ||
    nameLower.includes('trauma') ||
    nameLower.includes('burn')
  ) {
    return <HeartPulse className={className || 'w-4 h-4 text-rose-500'} />;
  }

  // Food / Rations
  if (
    iconKey === 'food' ||
    iconKey === 'rations' ||
    iconKey === '\u{1F371}' ||
    nameLower.includes('food') ||
    nameLower.includes('ration')
  ) {
    return <Utensils className={className || 'w-4 h-4 text-amber-500'} />;
  }

  // Blankets / Bedding
  if (
    iconKey === 'shelter' ||
    iconKey === 'bed' ||
    iconKey === 'blanket' ||
    iconKey === '\u{1F6CF}' ||
    nameLower.includes('blanket') ||
    nameLower.includes('bed')
  ) {
    return <Bed className={className || 'w-4 h-4 text-indigo-500'} />;
  }

  // Light / Torch
  if (
    iconKey === 'light' ||
    iconKey === 'torch' ||
    iconKey === 'flashlight' ||
    iconKey === '\u{1F526}' ||
    nameLower.includes('torch') ||
    nameLower.includes('light') ||
    nameLower.includes('searchlight')
  ) {
    return <Flashlight className={className || 'w-4 h-4 text-yellow-500'} />;
  }

  // Tools / Crowbar
  if (
    iconKey === 'tools' ||
    iconKey === 'tool' ||
    iconKey === 'crowbar' ||
    iconKey === '\u{1F6E0}' ||
    nameLower.includes('tool') ||
    nameLower.includes('crowbar') ||
    nameLower.includes('rescue')
  ) {
    return <Wrench className={className || 'w-4 h-4 text-slate-500 dark:text-slate-400'} />;
  }

  // Protective gear / Shield
  if (
    iconKey === 'shield' ||
    iconKey === 'gear' ||
    iconKey === '\u{1F6E1}' ||
    nameLower.includes('protective') ||
    nameLower.includes('gear')
  ) {
    return <Shield className={className || 'w-4 h-4 text-emerald-500'} />;
  }

  // Respirator / Mask
  if (
    iconKey === 'mask' ||
    iconKey === 'respirator' ||
    iconKey === '\u{1F637}' ||
    nameLower.includes('respirator') ||
    nameLower.includes('mask')
  ) {
    return <Activity className={className || 'w-4 h-4 text-teal-500'} />;
  }

  // Tent / Inflatable shelter
  if (
    iconKey === 'tent' ||
    iconKey === '\u{1F3AA}' ||
    nameLower.includes('tent') ||
    nameLower.includes('shelter')
  ) {
    return <Tent className={className || 'w-4 h-4 text-orange-500'} />;
  }

  // Radio / Communications
  if (
    iconKey === 'radio' ||
    iconKey === 'phone' ||
    iconKey === 'satellite' ||
    iconKey === '\u{1F4FB}' ||
    nameLower.includes('radio') ||
    nameLower.includes('phone') ||
    nameLower.includes('satellite')
  ) {
    return <Radio className={className || 'w-4 h-4 text-purple-500'} />;
  }

  // Generator / Power
  if (
    iconKey === 'power' ||
    iconKey === 'generator' ||
    iconKey === 'zap' ||
    iconKey === '\u{26A1}' ||
    nameLower.includes('generator') ||
    nameLower.includes('battery') ||
    nameLower.includes('power')
  ) {
    return <Zap className={className || 'w-4 h-4 text-amber-400'} />;
  }

  // Fuel / Gas
  if (
    iconKey === 'fuel' ||
    iconKey === 'gas' ||
    iconKey === 'canister' ||
    iconKey === '\u{26FD}' ||
    nameLower.includes('fuel') ||
    nameLower.includes('gas')
  ) {
    return <Fuel className={className || 'w-4 h-4 text-red-500'} />;
  }

  // Default Package icon
  return <Package className={className || 'w-4 h-4 text-blue-500'} />;
};
