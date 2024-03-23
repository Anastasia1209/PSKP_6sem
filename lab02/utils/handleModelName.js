const handleModelName = (modelName,models) => {
    switch (modelName) {
        case 'faculties':
            return models.FACULTY;
        case 'pulpits':
            return models.PULPIT;
        case 'subjects':
            return models.SUBJECT;
        case 'auditoriumstypes':
            return models.AUDITORIUM_TYPE;
        case 'auditoriums':
            return models.AUDITORIUM;
        case 'teachers':
            return models.TEACHER;
    }
}

module.exports = handleModelName;