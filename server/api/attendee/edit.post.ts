import supabase from '../../../config/supabaseClient'
import dayjs from 'dayjs';

export default eventHandler(async event => {
  // Only allow POST requests
  assertMethod(event, ['POST']);

  const body = await readBody(event);

  // Validate attendee
  const { error: errorValidate } = AttendeeSchema.validate(body, {
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

  // Check if attendee exists
  const { data, error } = await supabase.from('attendee').select().eq('id', body.id)

  if (error) {
    throw createError({
      statusCode: 200,
      statusMessage: 'Deelnemers niet gevonden',
    });
  } else {
    // Update attendee
    const { data: dataInserted, error: errorInsert } = await supabase.from('attendee')
      .update({ firstname: body.firstname, lastname: body.lastname, rating: Number(body.rating), updated_at: dayjs().format() })
      .eq('id', body.id)

    if (errorInsert) {
      throw createError({
        statusCode: 200,
        statusMessage: 'Sorry er gaat iets mis bij het opslaan van de deelnemer',
      });
    }

    return dataInserted;
  }
});
