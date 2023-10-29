export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
];

export const services = [
  {
    value: "šišanje",
    label: "Šišanje",
    iconLight: "/assets/icons/hairstyle-light.svg",
    iconDark: "/assets/icons/hairstyle-dark.svg",
  },
  {
    value: "uređivanje brade",
    label: "Uređivanje brade",
    iconLight: "/assets/icons/beard-light.svg",
    iconDark: "/assets/icons/beard-dark.svg",
  },
  {
    value: "šišanje i brada",
    label: "Šišanje & uređivanje brade",
    iconLight: "/assets/icons/hair-beard-light.svg",
    iconDark: "/assets/icons/hair-beard-dark.svg",
  },
];

export const navLinks = [
  {
    id: 0,
    label: "Profil",
    iconLight: "/assets/icons/profile-light.svg",
    iconDark: "/assets/icons/profile-dark.svg",
    linkTo: "/my-profile",
  },
  {
    id: 1,
    label: "Rezervirajte",
    iconLight: "/assets/icons/add-light.svg",
    iconDark: "/assets/icons/add-dark.svg",
    linkTo: "/add-reservation",
  },
  {
    id: 2,
    label: "Rezervacije",
    iconLight: "/assets/icons/list-light.svg",
    iconDark: "/assets/icons/list-dark.svg",
    linkTo: "/add-reservation",
  },
];
