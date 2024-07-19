import supabase from '../../../config/supabaseClient'

export default eventHandler(async event => {
  const body = await readBody(event);

  // Check if tournament exists
  const { data, error } = await supabase.from('Tournament')
    .select()
    .eq('id', body.id)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Toernooi niet gevonden',
    });
  } else {
    // Loop trough all selected attendees and add them to the tournament
    for (const attendeeId in body.attendees) {
      // Add attendee to tournament
      const { data: dataInserted, error: errorInsert } = await supabase.from('Tournament')
        .insert({ tournamentId: body.tournamentId, attendeeId: Number(attendeeId) })

      if (errorInsert) {
        throw createError({
          statusCode: 200,
          statusMessage: 'Sorry er gaat iets mis bij het toevoegen van de deelnemer aan het toernooi',
        });
      }
    }

    return 'Alle deelnemers zijn toegevoegd aan het toernooi'
  }
});
