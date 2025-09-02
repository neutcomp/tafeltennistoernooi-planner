import supabase from '../../../config/supabaseClient'

export default eventHandler(async event => {
  const body = await readBody(event);

  // Validate user
  const { error: validationError } = TournamentSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (validationError) {
    throw createError({
      statusCode: 200,
      statusMessage: validationError.message,
    });
  }

  // Check if tournament exists
  const { data, error } = await supabase.from('Tournament')
    .select().eq('name', body.name)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Sorry dit toernooi bestaat al',
    });
  } else {
    // Create tournament
    const { data: dataInserted, error: errorInsert } = await supabase.from('Tournament')
      .insert({ name: body.name })

    if (errorInsert) {
      throw createError({
        statusCode: 200,
        statusMessage: 'Sorry er gaat iets mis bij het opslaan van het toernooi',
      });
    }

    return dataInserted;
  }
});
