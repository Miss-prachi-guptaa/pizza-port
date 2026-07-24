export const formatUser = (user) => {
  return {
    id: user.id,
    fullName: user.name,
    email: user.email,
    avatar: user.avatar,
    provider: user.provider,
    role: user.role,
  };
};