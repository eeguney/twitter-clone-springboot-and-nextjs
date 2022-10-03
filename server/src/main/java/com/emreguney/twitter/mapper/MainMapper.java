package com.emreguney.twitter.mapper;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MainMapper {

    ModelMapper modelMapper;

    public MainMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    <F, T> T toEntity(F from, Class<T> to) {
        if (from == null) {
            return null;
        }
        T entity = modelMapper.map(from, to);
        return entity;
    }

    <F, T> T toDTO(F from, Class<T> to) {
        if (from == null) {
            return null;
        }
        T dto = modelMapper.map(from, to);
        return dto;
    }

    <F, T> List<T> toDTOList(List<F> from, Class<T> to) {
        if (from == null) {
            return null;
        }
        List<T> listDTO = from.stream().map(list -> toDTO(list, to)).collect(Collectors.toList());
        return listDTO;
    }

    <F, T> List<T> toEntityList(List<F> from, Class<T> to) {
        if (from == null) {
            return null;
        }
        List<T> listEntity = from.stream().map(list -> toEntity(list, to)).collect(Collectors.toList());
        return listEntity;
    }


}
