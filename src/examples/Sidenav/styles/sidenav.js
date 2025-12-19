
export default function sidenavLogoLabel(theme, { miniSidenav }) {
  const { transitions, breakpoints } = theme;

  return {
    opacity: miniSidenav ? 0 : 1,
    maxWidth: miniSidenav ? 0 : "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginLeft: miniSidenav ? 0 : "0.75rem",

    transition: transitions.create(["opacity", "margin"], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.short,
    }),

    "& h6": {
      fontSize: "0.875rem", // fixed safe value
      fontWeight: 500, // safe fallback font-weight
      lineHeight: 1.2,
    },

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
      marginLeft: miniSidenav ? 0 : "0.75rem",
    },
  };
}
