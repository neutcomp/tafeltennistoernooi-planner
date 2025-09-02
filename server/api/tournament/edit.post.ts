import supabase from '../../../config/supabaseClient'
import dayjs from 'dayjs';

export default eventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const body = await readBody(event);

  // Validate tournament
  const { error: errorValidate } = TournamentSchema.validate(body, {
    abortEarly: true,
    allowUnknown: true,
  });

  // If we get an error, send it back
  if (errorValidate) {
    throw createError({
      statusCode: 200,
      statusMessage: errorValidate.message,
    });
  }

  // Check if tournament exists
  const { data, error } = await supabase.from('Tournament').select().eq('id', body.id)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Toernooi niet gevonden',
    });
  } else {
    // Update attendee
    const { data: dataInserted, error: errorInsert } = await supabase.from('Tournament')
      .update({ name: body.name, updatedAt: dayjs().format() })
      .eq('id', body.id)

    if (errorInsert) {
      throw createError({
        statusCode: 200,
        statusMessage: 'Sorry er gaat iets mis bij het opslaan van het toernooi',
      });
    }

    return dataInserted;
  }
});
