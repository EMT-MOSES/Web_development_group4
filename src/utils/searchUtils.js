export function normalizeText(value = '') {
  return String(value).toLowerCase().trim();
}

export function filterAndSortArtists(artistProfiles, searchTerm = '', genreFilter = 'All Genres', sortValue = 'alphabetical') {
  const query = normalizeText(searchTerm);

  const filteredArtists = artistProfiles.filter((artist) => {
    const matchesSearch = !query || [artist.stageName, artist.genre, artist.location]
      .some((field) => normalizeText(field).includes(query));

    const matchesGenre = genreFilter === 'All Genres' || normalizeText(artist.genre) === normalizeText(genreFilter);

    return matchesSearch && matchesGenre;
  });

  return filteredArtists.sort((left, right) => {
    if (sortValue === 'recently-joined') {
      return right.userId.localeCompare(left.userId);
    }

    return String(left.stageName || '').localeCompare(String(right.stageName || ''));
  });
}

export function filterAndSortVenues(venueProfiles, searchTerm = '', locationFilter = 'All Locations', capacityFilter = 'All', sortValue = 'alphabetical') {
  const query = normalizeText(searchTerm);

  const filteredVenues = venueProfiles.filter((venue) => {
    const venueGenres = venue.supportedGenres || '';
    const capacity = Number(venue.capacity) || 0;

    const matchesSearch = !query || [venue.venueName, venue.location, venueGenres]
      .some((field) => normalizeText(field).includes(query));

    const matchesLocation = locationFilter === 'All Locations' || normalizeText(venue.location) === normalizeText(locationFilter);

    const matchesCapacity =
      capacityFilter === 'All' ||
      (capacityFilter === 'Small' && capacity < 500) ||
      (capacityFilter === 'Medium' && capacity >= 500 && capacity <= 1000) ||
      (capacityFilter === 'Large' && capacity > 1000);

    return matchesSearch && matchesLocation && matchesCapacity;
  });

  return filteredVenues.sort((left, right) => {
    if (sortValue === 'capacity') {
      return (Number(right.capacity) || 0) - (Number(left.capacity) || 0);
    }

    return String(left.venueName || '').localeCompare(String(right.venueName || ''));
  });
}

export function filterAndSortMusic(songs, artistProfiles, searchTerm = '', genreFilter = 'All Genres', sortValue = 'alphabetical') {
  const query = normalizeText(searchTerm);

  const filteredSongs = songs.filter((song) => {
    const artist = artistProfiles.find((profile) => profile.userId === song.artistId);
    const artistName = artist?.stageName || '';

    const matchesSearch = !query || [song.title, song.genre, artistName]
      .some((field) => normalizeText(field).includes(query));

    const matchesGenre = genreFilter === 'All Genres' || normalizeText(song.genre) === normalizeText(genreFilter);

    return matchesSearch && matchesGenre;
  });

  return filteredSongs.sort((left, right) => {
    if (sortValue === 'recently-uploaded') {
      return new Date(right.uploadDate || 0).getTime() - new Date(left.uploadDate || 0).getTime();
    }

    return String(left.title || '').localeCompare(String(right.title || ''));
  });
}
