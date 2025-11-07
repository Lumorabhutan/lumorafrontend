export const apiBaseUrl = "http://10.230.249.221:3001/api/v1";

export const getApiEndpoint = {
  // Auth
  login: () => `${apiBaseUrl}/login`,

  // Users
  getUsers: () => `${apiBaseUrl}/user`,
  getUserById: (id: string) => `${apiBaseUrl}/user/${id}`,
  createUser: () => `${apiBaseUrl}/user`,
  updateUser: (id: string) => `${apiBaseUrl}/user/${id}`,
  deleteUser: (id: number) => `${apiBaseUrl}/user/${id}`,

  // Bookings
  getBookings: () => `${apiBaseUrl}/booking`,
  getBookingById: (id: string) => `${apiBaseUrl}/booking/${id}`,
  createBooking: () => `${apiBaseUrl}/booking`,
  updateBooking: (id: string) => `${apiBaseUrl}/booking/${id}`,
  deleteBooking: (id: number) => `${apiBaseUrl}/booking/${id}`,

  // Trips
  getTrips: () => `${apiBaseUrl}/trips`,
  getTripById: (id: string) => `${apiBaseUrl}/trips/${id}`,
  createTrip: () => `${apiBaseUrl}/trips`,
  updateTrip: (id: string) => `${apiBaseUrl}/trips/${id}`,

  // Reviews
  getReview: () => `${apiBaseUrl}/review`,
  createReview: () => `${apiBaseUrl}/review`,
  updateReview: (id: string) => `${apiBaseUrl}/review/${id}`,
  deleteReview: (id: number) => `${apiBaseUrl}/review/${id}`,

  // Contact
  getContact: () => `${apiBaseUrl}/contact`,
  createContact: () => `${apiBaseUrl}/contact`,
  updateContact: (id: number) => `${apiBaseUrl}/contact/${id}`,
  deleteContact: (id: number) => `${apiBaseUrl}/contact/${id}`,
};
